'use client';

import { Box, Card, Flex, IconButton, Text } from '@radix-ui/themes';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { Lesson } from '@shared/lib/indexedDB/types';
import styles from './LessonEditorList.module.scss';
import { useRouter } from 'next/navigation';

interface LessonEditorListProps {
  lessons: Lesson[];
  onEdit: (lesson: Lesson) => void;
  onDelete: (lesson: Lesson) => void;
}

export const LessonEditorList = ({ lessons, onEdit, onDelete }: LessonEditorListProps) => {
  const router = useRouter();
  if (lessons.length === 0) {
    return (
      <Card className={styles.empty}>
        <Text>Нет доступных уроков</Text>
      </Card>
    );
  }

  const handleLessonChange = (value: string) => {
    router.push(`/lesson/${value}`);
  };

  return (
    <Box className={styles.list}>
      {lessons.map((lesson) => (
        <Card
          key={lesson.id}
          className={styles.item}
          onClick={(e) => {
            handleLessonChange(lesson.id);
          }}
        >
          <Flex justify="between" align="center">
            <Text>{lesson.title}</Text>
            <Flex gap="2">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(lesson);
                }}
              >
                <Pencil1Icon />
              </IconButton>
              <IconButton
                color="red"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(lesson);
                }}
              >
                <TrashIcon />
              </IconButton>
            </Flex>
          </Flex>
        </Card>
      ))}
    </Box>
  );
};
