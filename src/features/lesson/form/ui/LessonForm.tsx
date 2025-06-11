'use client';

import { Box, Button, Card, Flex, IconButton, Select, Text, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDB } from '@shared/lib/indexedDB/db';
import { Lesson, Word } from '@shared/lib/indexedDB/types';
import { translate } from '@shared/lib/translate/api';
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';
import styles from './LessonForm.module.scss';

interface LessonFormProps {
  lesson?: Lesson;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const LANGUAGES = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'Английский' },
  { value: 'de', label: 'Немецкий' },
  { value: 'fr', label: 'Французский' },
  { value: 'es', label: 'Испанский' },
];

export const LessonForm = ({ lesson, onSuccess, onCancel }: LessonFormProps) => {
  const [title, setTitle] = useState(lesson?.title || '');
  const [words, setWords] = useState<Word[]>(lesson?.words || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newWord, setNewWord] = useState({
    originalText: '',
    sourceLanguage: 'ru',
    targetLanguage: 'en',
  });
  const router = useRouter();

  const handleAddWord = async () => {
    if (!newWord.originalText.trim()) return;

    setIsTranslating(true);
    setError(null);

    try {
      const translatedText = await translate(
        newWord.originalText,
        newWord.sourceLanguage,
        newWord.targetLanguage,
      );

      const word: Word = {
        id: crypto.randomUUID(),
        originalText: newWord.originalText,
        translatedText,
        sourceLanguage: newWord.sourceLanguage,
        targetLanguage: newWord.targetLanguage,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setWords([...words, word]);
      setNewWord({
        originalText: '',
        sourceLanguage: 'ru',
        targetLanguage: 'en',
      });
    } catch (error) {
      setError('Ошибка при переводе слова. Пожалуйста, попробуйте еще раз.');
      console.error('Error translating word:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleRemoveWord = (wordId: string) => {
    setWords(words.filter((word) => word.id !== wordId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const db = await getDB();
      const lessonData: Lesson = {
        id: lesson?.id || crypto.randomUUID(),
        title,
        words,
        createdAt: lesson?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (lesson) {
        await db.put('lessons', lessonData);
      } else {
        await db.add('lessons', lessonData);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/lesson');
      }
    } catch (error) {
      console.error('Error saving lesson:', error);
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
          <TextField.Root
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            placeholder="Введите название урока"
            required
          />
        </Box>

        <Box mb="4">
          <Text size="3" mb="2" weight="bold">
            Слова
          </Text>

          <Box className={styles.wordsList}>
            {words.map((word) => (
              <Card key={word.id} className={styles.wordItem}>
                <Flex justify="between" align="center">
                  <Box>
                    <Text weight="bold">{word.originalText}</Text>
                    <Text color="gray">{word.translatedText}</Text>
                  </Box>
                  <IconButton color="red" onClick={() => handleRemoveWord(word.id)}>
                    <Cross1Icon />
                  </IconButton>
                </Flex>
              </Card>
            ))}
          </Box>

          <Box className={styles.addWord}>
            <TextField.Root
              value={newWord.originalText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewWord({ ...newWord, originalText: e.target.value })
              }
              placeholder="Введите слово"
              disabled={isTranslating}
            />

            <Select.Root
              value={newWord.sourceLanguage}
              onValueChange={(value) => setNewWord({ ...newWord, sourceLanguage: value })}
              disabled={isTranslating}
            >
              <Select.Trigger />
              <Select.Content>
                {LANGUAGES.map((lang) => (
                  <Select.Item key={lang.value} value={lang.value}>
                    {lang.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>

            <Select.Root
              value={newWord.targetLanguage}
              onValueChange={(value) => setNewWord({ ...newWord, targetLanguage: value })}
              disabled={isTranslating}
            >
              <Select.Trigger />
              <Select.Content>
                {LANGUAGES.map((lang) => (
                  <Select.Item key={lang.value} value={lang.value}>
                    {lang.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>

            <IconButton type="button" onClick={handleAddWord} disabled={isTranslating}>
              <PlusIcon />
            </IconButton>
          </Box>

          {error && (
            <Text color="red" size="2" mt="2">
              {error}
            </Text>
          )}
        </Box>

        <Box className={styles.buttons}>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Сохранение...' : lesson ? 'Сохранить изменения' : 'Создать урок'}
          </Button>
          {onCancel && (
            <Button type="button" variant="soft" onClick={onCancel}>
              Отмена
            </Button>
          )}
        </Box>
      </form>
    </Card>
  );
};
