export interface Lesson {
  id: string;
  title: string;
  words?: Word[];
  createdAt: string;
  updatedAt: string;
}

export interface Word {
  id: string;
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  createdAt: string;
  updatedAt: string;
  stats?: WordStats;
}

export interface WordStats {
  correct: number;
  almost: number;
  wrong: number;
}

export interface DatabaseSchema {
  lessons: {
    key: string;
    value: Lesson;
  };
}
