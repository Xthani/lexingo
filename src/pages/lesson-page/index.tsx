'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Card, Text, Button } from '@radix-ui/themes';
import { getDB } from '@shared/lib/indexedDB/db';
import { Lesson } from '@shared/lib/indexedDB/types';

export default function LessonPage() {
  const router = useRouter();
  const params = useParams() ?? {};
  const idParam = (params as Record<string, string | string[] | undefined>).id;
  const lessonId = typeof idParam === 'string' ? idParam : Array.isArray(idParam) ? idParam[0] : '';
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lessonId) return;
    getDB()
      .then((db) => db.get('lessons', lessonId))
      .then((data) => setLesson(data))
      .finally(() => setLoading(false));
  }, [lessonId]);

  const handleStartLearning = () => {
    if (lesson?.id) {
      router.push(`/lesson/${lesson.id}/learn`);
    }
  };

  if (loading) return <Text>Загрузка...</Text>;
  if (!lesson) return <Text>Урок не найден</Text>;

  return (
    <Box>
      <h1>{lesson.title}</h1>
      {lesson.words && lesson.words.length > 0 ? (
        <Card>
          <Text size="4" weight="bold" mb="2">
            Слова в уроке:
          </Text>
          {lesson.words.map((word) => (
            <Box key={word.id} mb="2">
              <Text>
                {word.originalText} - {word.translatedText}
              </Text>
            </Box>
          ))}
          <Box mt="4">
            <Button onClick={handleStartLearning} size="4">
              Начать обучение
            </Button>
          </Box>
        </Card>
      ) : (
        <Card>
          <Text>В этом уроке пока нет слов</Text>
        </Card>
      )}
    </Box>
  );
}
