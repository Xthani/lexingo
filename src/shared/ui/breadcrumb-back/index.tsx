'use client';

import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import styles from './styles.module.scss';

export const BreadcrumbBack = () => {
  return (
    <Link href="/lesson" className={styles.back}>
      <ArrowLeftIcon />
      <span>Назад к урокам</span>
    </Link>
  );
};
