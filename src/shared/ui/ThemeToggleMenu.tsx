'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import styles from './ThemeToggleMenu.module.scss';

export const ThemeToggleMenu = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.trigger} aria-label="Открыть меню">
          {theme === 'dark' ? (
            <MoonIcon className={styles.icon} />
          ) : (
            <SunIcon className={styles.icon} />
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.content} sideOffset={5}>
          <DropdownMenu.Item className={styles.item} onClick={() => setTheme('light')}>
            <SunIcon />
            <span>Светлая тема</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.item} onClick={() => setTheme('dark')}>
            <MoonIcon />
            <span>Тёмная тема</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
