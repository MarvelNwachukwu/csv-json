import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './provider';

import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CSV to JSON',
  description: 'Convert CSV data into JSON format',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Script
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6171078836003402'
        crossOrigin='anonymous'
      />
      {/* <script
        async
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6171078836003402'
        crossOrigin='anonymous'
      ></script> */}
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
