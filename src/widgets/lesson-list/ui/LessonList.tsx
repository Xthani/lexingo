'use client';

import { Box, Card, Text } from '@radix-ui/themes';
import { Lesson } from '@entities/lesson/model/types';
import styles from './LessonList.module.scss';
import { LessonSelect } from '@features/lesson/select';

interface LessonListProps {
  lessons: Lesson[];
  defaultLessonId?: string;
}

export const LessonList = ({ lessons, defaultLessonId }: LessonListProps) => {
  return (
    <Box className={styles.container}>
      <h1>Выберите урок</h1>
      <Card>
        <LessonSelect lessons={lessons} defaultValue={defaultLessonId} />
      </Card>
    </Box>
  );
};
