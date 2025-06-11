'use client';

import { Box, Button, Card, Text, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDB } from '@shared/lib/indexedDB/db';
import { Lesson } from '@shared/lib/indexedDB/types';
import styles from './AddLessonForm.module.scss';

export const AddLessonForm = () => {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const db = await getDB();
      const lesson: Lesson = {
        id: crypto.randomUUID(),
        title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await db.add('lessons', lesson);
      router.push('/lesson');
    } catch (error) {
      console.error('Error adding lesson:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={styles.form}>
      <form onSubmit={handleSubmit}>
        <Box mb="4">
          <Text as="label" size="2" mb="1" weight="bold">
            Название урока
          </Text>
          <TextField.Root>
            <TextField.Slot>
              <input
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                placeholder="Введите название урока"
                required
              />
            </TextField.Slot>
          </TextField.Root>
        </Box>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Сохранение...' : 'Сохранить урок'}
        </Button>
      </form>
    </Card>
  );
}; 