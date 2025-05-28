'use client';

import { Box, Card, Text } from '@radix-ui/themes';

export default function LessonViewPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Box>
      <h1>Урок {params.id}</h1>
      <Card>
        <Text>Здесь будет содержимое урока</Text>
      </Card>
    </Box>
  );
} 