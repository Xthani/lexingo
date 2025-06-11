export interface Lesson {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Word {
  id: string;
  lessonId: string;
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  createdAt: string;
  updatedAt: string;
}

export interface DatabaseSchema {
  lessons: {
    key: string;
    value: Lesson;
  };
  words: {
    key: string;
    value: Word;
  };
} 