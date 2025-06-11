'use client';

import { Box, Button, Card, Flex, IconButton, Text } from '@radix-ui/themes';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { Lesson } from '@shared/lib/indexedDB/types';
import styles from './LessonEditorList.module.scss';

interface LessonEditorListProps {
  lessons: Lesson[];
  onEdit: (lesson: Lesson) => void;
  onDelete: (lesson: Lesson) => void;
}

export const LessonEditorList = ({ lessons, onEdit, onDelete }: LessonEditorListProps) => {
  if (lessons.length === 0) {
    return (
      <Card className={styles.empty}>
        <Text>Нет доступных уроков</Text>
      </Card>
    );
  }

  return (
    <Box className={styles.list}>
      {lessons.map((lesson) => (
        <Card key={lesson.id} className={styles.item}>
          <Flex justify="between" align="center">
            <Text>{lesson.title}</Text>
            <Flex gap="2">
              <IconButton onClick={() => onEdit(lesson)}>
                <Pencil1Icon />
              </IconButton>
              <IconButton color="red" onClick={() => onDelete(lesson)}>
                <TrashIcon />
              </IconButton>
            </Flex>
          </Flex>
        </Card>
      ))}
    </Box>
  );
}; 