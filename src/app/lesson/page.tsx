'use client';

import { Box, Text } from '@radix-ui/themes';
import { LessonList } from '@widgets/lesson-list';
import { useLessons } from '@features/lesson/list/model/useLessons';

export default function LessonPage() {
  const { lessons, isLoading, error } = useLessons();

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
      <Text size="6" mb="4" weight="bold">
        Уроки
      </Text>
      <LessonList lessons={lessons} />
    </Box>
  );
}
