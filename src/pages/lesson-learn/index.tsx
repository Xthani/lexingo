'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Card, Text, Button, TextField, Select, Flex, IconButton } from '@radix-ui/themes';
import { getDB } from '@shared/lib/indexedDB/db';
import { Lesson, Word } from '@shared/lib/indexedDB/types';
import stringSimilarity from 'string-similarity';
import { CheckboxIcon, Cross2Icon } from '@radix-ui/react-icons';

type LearningMode = 'ru-to-en' | 'en-to-ru';

interface LearningStats {
  correct: number;
  almost: number;
  wrong: number;
}

interface LastCheckResult {
  word: string;
  result: 'correct' | 'almost' | 'wrong';
}

interface LearningSettings {
  circularLearning: boolean;
  trackStats: boolean;
}

export default function LessonLearnPage() {
  const router = useRouter();
  const params = useParams() ?? {};
  const idParam = (params as Record<string, string | string[] | undefined>).id;
  const lessonId = typeof idParam === 'string' ? idParam : Array.isArray(idParam) ? idParam[0] : '';

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<LearningMode>('ru-to-en');
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [remainingWords, setRemainingWords] = useState<Word[]>([]);
  const [incorrectWords, setIncorrectWords] = useState<Word[]>([]);
  const [userInput, setUserInput] = useState('');
  const [stats, setStats] = useState<LearningStats>({ correct: 0, almost: 0, wrong: 0 });
  const [isStarted, setIsStarted] = useState(false);
  const [lastCheckResult, setLastCheckResult] = useState<LastCheckResult | null>(null);
  const [settings, setSettings] = useState<LearningSettings>({
    circularLearning: true,
    trackStats: true,
  });

  useEffect(() => {
    if (!lessonId) return;
    getDB()
      .then((db) => db.get('lessons', lessonId))
      .then((data) => {
        setLesson(data);
        if (data?.words) {
          setRemainingWords([...data.words]);
        }
      })
      .finally(() => setLoading(false));
  }, [lessonId]);

  const getNextWord = () => {
    if (remainingWords.length === 0) {
      if (settings.circularLearning && incorrectWords.length > 0) {
        const randomIndex = Math.floor(Math.random() * incorrectWords.length);
        const word = incorrectWords[randomIndex];
        setIncorrectWords((prev) => prev.filter((_, index) => index !== randomIndex));
        return word;
      }
      return null;
    }
    const randomIndex = Math.floor(Math.random() * remainingWords.length);
    const word = remainingWords[randomIndex];
    setRemainingWords((prev) => prev.filter((_, index) => index !== randomIndex));
    return word;
  };

  const handleStart = () => {
    setIsStarted(true);
    setCurrentWord(getNextWord());
  };

  const checkTranslation = (
    userInput: string,
    correctAnswers: string[],
  ): {
    result: 'correct' | 'almost' | 'wrong';
    similarity: number;
  } => {
    const normalizedInput = userInput.trim().toLowerCase();
    const bestMatch = stringSimilarity.findBestMatch(
      normalizedInput,
      correctAnswers.map((a) => a.toLowerCase()),
    );
    const similarity = bestMatch.bestMatch.rating;

    if (similarity >= 0.9) return { result: 'correct', similarity };
    if (similarity >= 0.75) return { result: 'almost', similarity };
    return { result: 'wrong', similarity };
  };

  const handleSubmit = () => {
    if (!currentWord) return;

    const correctAnswer =
      mode === 'ru-to-en' ? currentWord.translatedText : currentWord.originalText;
    const result = checkTranslation(userInput, [correctAnswer]);

    setLastCheckResult({
      word: correctAnswer,
      result: result.result,
    });

    if (settings.trackStats) {
      setStats((prev) => ({
        ...prev,
        [result.result]: prev[result.result] + 1,
      }));
    }

    if (result.result !== 'correct' && settings.circularLearning) {
      setIncorrectWords((prev) => [...prev, currentWord]);
    }

    setUserInput('');
    setCurrentWord(getNextWord());
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const getResultColor = (result: 'correct' | 'almost' | 'wrong') => {
    switch (result) {
      case 'correct':
        return 'green';
      case 'almost':
        return 'yellow';
      case 'wrong':
        return 'red';
    }
  };

  const getResultText = (result: 'correct' | 'almost' | 'wrong') => {
    switch (result) {
      case 'correct':
        return 'Верно';
      case 'almost':
        return 'Почти правильно';
      case 'wrong':
        return 'Неверно';
    }
  };

  const toggleSetting = (setting: keyof LearningSettings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  if (loading) return <Text>Загрузка...</Text>;
  if (!lesson) return <Text>Урок не найден</Text>;

  if (!isStarted) {
    return (
      <Box>
        <Card>
          <Text size="4" weight="bold" mb="4">
            Настройка обучения
          </Text>
          <Box mb="4">
            <Text mb="2">Выберите режим обучения:</Text>
            <Select.Root value={mode} onValueChange={(value: LearningMode) => setMode(value)}>
              <Select.Trigger />
              <Select.Content>
                <Select.Item value="ru-to-en">Русский → Английский</Select.Item>
                <Select.Item value="en-to-ru">Английский → Русский</Select.Item>
              </Select.Content>
            </Select.Root>
          </Box>
          <Box mb="4">
            <Flex gap="2" align="center">
              <IconButton
                onClick={() => toggleSetting('circularLearning')}
                color={settings.circularLearning ? 'green' : 'gray'}
              >
                {settings.circularLearning ? <CheckboxIcon /> : <Cross2Icon />}
              </IconButton>
              <Text>Круговое обучение</Text>
            </Flex>
            <Flex gap="2" align="center" mt="2">
              <IconButton
                onClick={() => toggleSetting('trackStats')}
                color={settings.trackStats ? 'green' : 'gray'}
              >
                {settings.trackStats ? <CheckboxIcon /> : <Cross2Icon />}
              </IconButton>
              <Text>Вести статистику</Text>
            </Flex>
          </Box>
          <Button onClick={handleStart} size="3">
            Начать обучение
          </Button>
        </Card>
      </Box>
    );
  }

  if (!currentWord) {
    return (
      <Box>
        <Card>
          {lastCheckResult && (
            <Box mb="4">
              <Text color={getResultColor(lastCheckResult.result)}>
                {getResultText(lastCheckResult.result)}: {lastCheckResult.word}
              </Text>
            </Box>
          )}
          <Text size="4" weight="bold" mb="4">
            Обучение завершено!
          </Text>
          {settings.trackStats && (
            <>
              <Text mb="2">Статистика:</Text>
              <Text>Правильно: {stats.correct}</Text>
              <Text>С ошибками: {stats.almost}</Text>
              <Text>Неправильно: {stats.wrong}</Text>
            </>
          )}
          <Box mt="4">
            <Button onClick={() => router.push(`/lesson/${lessonId}`)} size="3">
              Вернуться к уроку
            </Button>
          </Box>
        </Card>
      </Box>
    );
  }

  return (
    <Box>
      <Card>
        {lastCheckResult && (
          <Box mb="4">
            <Text color={getResultColor(lastCheckResult.result)}>
              {getResultText(lastCheckResult.result)}: {lastCheckResult.word}
            </Text>
          </Box>
        )}
        <Text size="4" weight="bold" mb="4">
          {mode === 'ru-to-en' ? currentWord.originalText : currentWord.translatedText}
        </Text>
        <Box mb="4">
          <TextField.Root
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Введите перевод"
          />
        </Box>
        <Button onClick={handleSubmit} size="3">
          Проверить
        </Button>
        <Box mt="4">
          <Text>Осталось слов: {remainingWords.length + incorrectWords.length}</Text>
        </Box>
      </Card>
    </Box>
  );
}
