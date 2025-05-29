import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { ThemeProvider } from 'next-themes';
import '@shared/styles/globals.scss';
import { LayoutHeader } from '@shared/ui/layout-header';
import { Sidebar } from '@shared/ui/sidebar';

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
