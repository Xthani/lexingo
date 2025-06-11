import { openDB } from 'idb';
import { DatabaseSchema } from './types';

const DB_NAME = 'lexingo-db';
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB<DatabaseSchema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('lessons')) {
        db.createObjectStore('lessons', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('words')) {
        db.createObjectStore('words', { keyPath: 'id' });
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