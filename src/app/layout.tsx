import '@/styles/globals.css';

import type { Metadata } from 'next';

import { LayoutWrapper } from '@/components/layout';
import { initMocks } from '@/mock';

import { pretendard } from '../lib/fonts';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'WeGo',
  description: 'WeGo에서 새로운 인연들을 만나보세요!',
  icons: './favicon.svg',
};

initMocks();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${pretendard.className} ${pretendard.variable} antialiased`}>
        <Providers>
          <div id='root'>
            <LayoutWrapper>{children}</LayoutWrapper>
          </div>
        </Providers>
      </body>
    </html>
  );
}
