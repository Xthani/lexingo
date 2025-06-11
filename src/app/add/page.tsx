'use client';

import { Box, Text } from '@radix-ui/themes';
import { AddLessonForm } from '@features/lesson/add';

export default function AddLessonPage() {
  return (
    <Box>
      <Text size="6" mb="4" weight="bold">
        Добавить урок
      </Text>
      <AddLessonForm />
    </Box>
  );
}
