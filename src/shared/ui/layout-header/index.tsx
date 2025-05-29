'use client';

import { Box, Flex } from '@radix-ui/themes';
import styles from './styles.module.scss';
import { ThemeToggleMenu } from '@shared/ui/theme-toggle-menu';

export const LayoutHeader = () => {
  return (
    <Box className={styles.header}>
      <Flex height="100%" justify="end" align="center">
        <ThemeToggleMenu />
      </Flex>
    </Box>
  );
};
