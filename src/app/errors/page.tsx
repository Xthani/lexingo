'use client';

import { Box, Card, Text } from '@radix-ui/themes';

export default function ErrorsPage() {
  return (
    <Box>
      <Text size={'7'}>Ошибки</Text>
      <Card>
        <Text>Здесь будет список ошибок</Text>
      </Card>
    </Box>
  );
}
