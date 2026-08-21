import { openDB } from 'idb';
import { DatabaseSchema, Lesson } from './types';

const DB_NAME = 'lexingo-db';
const DB_VERSION = 2;

const DEMO_LESSON: Lesson = {
  id: 'demo-essential-english',
  title: 'Essential English',
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:00:00.000Z',
  words: [
    ['возможность', 'opportunity'],
    ['ответственность', 'responsibility'],
    ['надёжный', 'reliable'],
    ['улучшать', 'improve'],
    ['достигать', 'achieve'],
    ['сложная задача', 'challenge'],
  ].map(([originalText, translatedText], index) => ({
    id: `demo-word-${index + 1}`,
    originalText,
    translatedText,
    sourceLanguage: 'ru',
    targetLanguage: 'en',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  })),
};

export const initDB = async () => {
  return openDB<DatabaseSchema>(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion, _newVersion, transaction) {
      if (!db.objectStoreNames.contains('lessons')) {
        db.createObjectStore('lessons', { keyPath: 'id' });
      }

      if (oldVersion < 2) {
        transaction.objectStore('lessons').put(DEMO_LESSON);
      }
    },
  });
};

let dbInstance: Awaited<ReturnType<typeof initDB>> | null = null;

export const getDB = async () => {
  if (!dbInstance) {
    dbInstance = await initDB();
  }
  return dbInstance;
};
