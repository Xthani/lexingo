'use client';

import { Box, Button, Dialog, Text } from '@radix-ui/themes';
import styles from './Alert.module.scss';

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export const Alert = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
}: AlertProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className={styles.alert}>
        <Dialog.Title className={styles.title}>{title}</Dialog.Title>
        <Text className={styles.message}>{message}</Text>
        <Box className={styles.buttons}>
          <Button variant="soft" onClick={onClose}>
            {cancelText}
          </Button>
          <Button color="red" onClick={onConfirm}>
            {confirmText}
          </Button>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
}; 