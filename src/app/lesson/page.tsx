'use client';

import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const lessons = [
  { id: '1', title: 'Урок 1: Приветствие' },
  { id: '2', title: 'Урок 2: Знакомство' },
  { id: '3', title: 'Урок 3: Семья' },
];

export default function LessonPage() {
  const router = useRouter();

  const handleLessonChange = (value: string) => {
    router.push(`/lesson/${value}`);
  };

  return (
    <div>
      <h1>Выберите урок</h1>
      <Select.Root defaultValue="1" onValueChange={handleLessonChange}>
        <Select.Trigger />
        <Select.Content>
          <>
            {lessons.map((lesson) => (
              <Select.Item key={lesson.id} value={lesson.id}>
                {lesson.title}
              </Select.Item>
            ))}
          </>
        </Select.Content>
      </Select.Root>
    </div>
  );
}
