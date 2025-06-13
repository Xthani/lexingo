'use client';

import { Box, Flex, Text } from '@radix-ui/themes';
import styles from './styles.module.scss';
import { ThemeToggleMenu } from '@shared/ui/theme-toggle-menu';
import Link from 'next/link';

export const LayoutHeader = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  return (
    <Box className={styles.header}>
      <Flex height="100%" justify="end" align="center">
        <div className={styles.mobileLogoWrapper}>
          {!isSidebarOpen && (
            <Link href="/" className={styles.mobileLogo}>
              <Text>Lexingo</Text>
            </Link>
          )}
        </div>
        <ThemeToggleMenu />
      </Flex>
    </Box>
  );
};
