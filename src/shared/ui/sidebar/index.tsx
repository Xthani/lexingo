'use client';

import { Box, Flex, Text, IconButton } from '@radix-ui/themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import styles from './styles.module.scss';

const navigation = [
  { name: 'Главная', href: '/' },
  { name: 'Уроки', href: '/lesson' },
  { name: 'Ошибки', href: '/errors' },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <IconButton
        className={styles.menuButton}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
        size={'4'}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </IconButton>
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}
      <Box className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <Flex direction="column" style={{ height: '100%' }}>
          <Link href={'/'} className={styles.logo}>
            <Text>Lexingo</Text>
          </Link>

          <nav className={styles.nav}>
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </Flex>
      </Box>
    </>
  );
};
