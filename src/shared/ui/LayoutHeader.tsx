'use client';

import { Box, Flex } from '@radix-ui/themes';
import { ThemeToggleMenu } from './ThemeToggleMenu';
import styles from './LayoutHeader.module.scss';

export const LayoutHeader = () => {
  return (
    <Box className={styles.header}>
      <Flex height="100%" justify="end" align="center">
        <ThemeToggleMenu />
      </Flex>
    </Box>
  );
};
