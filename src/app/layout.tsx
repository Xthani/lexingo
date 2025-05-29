import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { ThemeProvider } from 'next-themes';
import { Sidebar } from '@/shared/ui/Sidebar';
import { LayoutHeader } from '@/shared/ui/LayoutHeader';
import '@/styles/globals.scss';

export const metadata = {
  title: 'Lexingo',
  description: 'Language learning platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <Theme accentColor="blue" grayColor="slate" radius="medium">
            <div className="layout">
              <Sidebar />
              <LayoutHeader />
              <main className="main-content">{children}</main>
            </div>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
