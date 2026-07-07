import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import { AuthProvider } from '@/components/AuthProvider/AuthProvider';
import { FavoritesProvider } from '@/components/FavoritesProvider/FavoritesProvider';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Language School',
  description:
    'Курси іноземних мов: англійська, іспанська та інші. Групові та індивідуальні заняття.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AuthProvider>
          <FavoritesProvider>
            <Header />
            <main>{children}</main>
            <footer>
              <p>
                Created <time dateTime="2026">2026</time>
              </p>
            </footer>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
