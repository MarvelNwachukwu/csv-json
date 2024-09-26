import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './provider';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from "@vercel/analytics/react"

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
      <GoogleAnalytics gaId='G-5LT6F846' />
      <Analytics/>
      
      <body className={inter.className}>
        <GoogleTagManager gtmId='GTM-5LT6F846' />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
