import { Box, Card, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import { API_CONFIG, API_ENDPOINTS } from '@shared/config/api';

interface LessonPageProps {
  params: {
    id: string;
  };
}

async function getLesson(id: string) {
  try {
    const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.lesson(id)}`, {
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error('Failed to fetch lesson');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching lesson:', error);
    throw error;
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const lesson = await getLesson(params.id);

  return (
    <Box>
      <h1>{lesson.title}</h1>
      <Card>
        <Text>{lesson.description}</Text>
        <Text>{lesson.content}</Text>
      </Card>
    </Box>
  );
}
