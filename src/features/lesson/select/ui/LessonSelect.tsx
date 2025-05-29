'use client';

import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { Lesson } from '@entities/lesson/model/types';

interface LessonSelectProps {
  lessons: Lesson[];
  defaultValue?: string;
}

export const LessonSelect = ({ lessons, defaultValue }: LessonSelectProps) => {
  const router = useRouter();

  const handleLessonChange = (value: string) => {
    router.push(`/lesson/${value}`);
  };

  return (
    <Select.Root defaultValue={defaultValue} onValueChange={handleLessonChange}>
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
  );
};
