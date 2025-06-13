// 'use client';

import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { ThemeProvider } from 'next-themes';
import '@shared/styles/globals.scss';
import { LayoutShell } from '@/widgets/layout-shell/LayoutShell';

export const metadata = {
  title: 'Lexingo',
  description: 'Language learning platform',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <Theme accentColor="blue" grayColor="slate" radius="medium">
            <LayoutShell>{children}</LayoutShell>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
