'use client';

import { useEffect, useState } from 'react';
import { getDB } from '@shared/lib/indexedDB/db';
import { Lesson } from '@shared/lib/indexedDB/types';

export const useLessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshLessons = async () => {
    try {
      const db = await getDB();
      const allLessons = await db.getAll('lessons');
      setLessons(allLessons);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load lessons'));
    }
  };

  useEffect(() => {
    refreshLessons().finally(() => setIsLoading(false));
  }, []);

  return { lessons, isLoading, error, refreshLessons };
}; 