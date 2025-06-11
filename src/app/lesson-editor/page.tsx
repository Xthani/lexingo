'use client';

import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { useState } from 'react';
import { useLessons } from '@features/lesson/list/model/useLessons';
import { LessonForm } from '@features/lesson/form/ui/LessonForm';
import { LessonEditorList } from '@features/lesson/editor/ui/LessonEditorList';
import { Modal } from '@shared/ui/Modal/ui/Modal';
import { Alert } from '@shared/ui/Alert/ui/Alert';
import { Lesson } from '@shared/lib/indexedDB/types';
import { getDB } from '@shared/lib/indexedDB/db';

export default function LessonEditorPage() {
  const { lessons, isLoading, error } = useLessons();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | undefined>();
  const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null);

  const handleEdit = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const handleDelete = (lesson: Lesson) => {
    setLessonToDelete(lesson);
    setIsAlertOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!lessonToDelete) return;

    try {
      const db = await getDB();
      await db.delete('lessons', lessonToDelete.id);
      setIsAlertOpen(false);
      setLessonToDelete(null);
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedLesson(undefined);
  };

  if (isLoading) {
    return (
      <Box>
        <Text>Загрузка уроков...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Text color="red">Ошибка при загрузке уроков: {error.message}</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Flex justify="between" align="center" mb="4">
        <Text size="6" weight="bold">
          Редактор уроков
        </Text>
        <Button onClick={() => setIsModalOpen(true)}>Добавить урок</Button>
      </Flex>

      <LessonEditorList lessons={lessons} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={selectedLesson ? 'Редактировать урок' : 'Добавить урок'}
      >
        <LessonForm
          lesson={selectedLesson}
          onSuccess={handleModalClose}
          onCancel={handleModalClose}
        />
      </Modal>

      <Alert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Удалить урок"
        message="Вы уверены, что хотите удалить этот урок? Это действие нельзя отменить."
        confirmText="Удалить"
      />
    </Box>
  );
}
