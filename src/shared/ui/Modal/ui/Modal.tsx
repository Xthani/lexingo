'use client';

import { Box, Dialog } from '@radix-ui/themes';
import { ReactNode } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className={styles.modal}>
        {title && <Dialog.Title className={styles.title}>{title}</Dialog.Title>}
        <Box className={styles.content}>{children}</Box>
      </Dialog.Content>
    </Dialog.Root>
  );
};
