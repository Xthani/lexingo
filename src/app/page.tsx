'use client';

import { useLessons } from '@features/lesson/list/model/useLessons';
import { useState } from 'react';
import { Lesson } from '@shared/lib/indexedDB/types';
import { getDB } from '@shared/lib/indexedDB/db';
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes';
import { LessonEditorList } from '@features/lesson/editor';
import { Modal } from '@shared/ui/Modal';
import { LessonForm } from '@features/lesson/form/ui/LessonForm';
import { Alert } from '@shared/ui/Alert';

export default function LessonEditorPage() {
  const { lessons, isLoading, error, refreshLessons } = useLessons();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | undefined>();
  const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null);
  const [search, setSearch] = useState('');

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
      await refreshLessons();
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const handleModalClose = async () => {
    setIsModalOpen(false);
    setSelectedLesson(undefined);
    await refreshLessons();
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

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <Box>
      <Text size="6" weight="bold">
        Редактор уроков
      </Text>

      <Flex justify={'between'} direction={'column'} mt={'4'} mb={'4'}>
        <Box style={{ maxWidth: 400 }}>
          <TextField.Root
            mb={'4'}
            size={'3'}
            placeholder="Поиск по названию урока"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button size={'4'} onClick={() => setIsModalOpen(true)}>
            <Text size={'4'}>Добавить урок</Text>
          </Button>
        </Box>
      </Flex>

      <LessonEditorList lessons={filteredLessons} onEdit={handleEdit} onDelete={handleDelete} />

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
