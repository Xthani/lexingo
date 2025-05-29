import { LessonList } from '@widgets/lesson-list';

const mockLessons = [
  { id: '1', title: 'Урок 1: Приветствие', createdAt: '2024-03-29', updatedAt: '2024-03-29' },
  { id: '2', title: 'Урок 2: Знакомство', createdAt: '2024-03-29', updatedAt: '2024-03-29' },
  { id: '3', title: 'Урок 3: Семья', createdAt: '2024-03-29', updatedAt: '2024-03-29' },
];

export default function LessonPage() {
  return <LessonList lessons={mockLessons} />;
}
