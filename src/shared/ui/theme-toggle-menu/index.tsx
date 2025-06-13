'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

export const ThemeToggleMenu = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button 
      className={styles.trigger} 
      onClick={toggleTheme}
      aria-label="Переключить тему"
    >
      {theme === 'dark' ? (
        <MoonIcon className={styles.icon} />
      ) : (
        <SunIcon className={styles.icon} />
      )}
    </button>
  );
};
