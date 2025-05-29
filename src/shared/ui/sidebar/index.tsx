'use client';

import { Box, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './styles.module.scss';

const navigation = [
  { name: 'Уроки', href: '/lesson' },
  { name: 'Добавить урок', href: '/add' },
  { name: 'Ошибки', href: '/errors' },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <Box className={styles.sidebar}>
      <Flex direction="column" style={{ height: '100%' }}>
        <Text className={styles.logo}>Lexingo</Text>

        <nav className={styles.nav}>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </Flex>
    </Box>
  );
};
