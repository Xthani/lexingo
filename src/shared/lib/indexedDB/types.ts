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
}

export interface DatabaseSchema {
  lessons: {
    key: string;
    value: Lesson;
  };
}
