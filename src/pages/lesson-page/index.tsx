'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Card, Text } from '@radix-ui/themes';
import { getDB } from '@shared/lib/indexedDB/db';
import { Lesson } from '@shared/lib/indexedDB/types';

export default function LessonPage() {
  const params = useParams() ?? {};
  const idParam = (params as Record<string, string | string[] | undefined>).id;
  const lessonId = typeof idParam === 'string' ? idParam : Array.isArray(idParam) ? idParam[0] : '';
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lessonId) return;
    getDB()
      .then(db => db.get('lessons', lessonId))
      .then(data => setLesson(data))
      .finally(() => setLoading(false));
  }, [lessonId]);

  if (loading) return <Text>Загрузка...</Text>;
  if (!lesson) return <Text>Урок не найден</Text>;

  return (
    <Box>
      <h1>{lesson.title}</h1>
      {lesson.words && lesson.words.length > 0 ? (
        <Card>
          <Text size="4" weight="bold" mb="2">Слова в уроке:</Text>
          {lesson.words.map((word) => (
            <Box key={word.id} mb="2">
              <Text>{word.originalText} - {word.translatedText}</Text>
            </Box>
          ))}
        </Card>
      ) : (
        <Card>
          <Text>В этом уроке пока нет слов</Text>
        </Card>
      )}
    </Box>
  );
}
