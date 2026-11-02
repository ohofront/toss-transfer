import type { Metadata } from 'next';
import { Nanum_Gothic } from 'next/font/google';
import './globals.css';

const nanumGothic = Nanum_Gothic({
  weight: ['400', '700'],
  variable: '--font-nanum-gothic',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: '토스 송금 서비스 | Toss Transfer',
  description: '토스 간편 송금 웹 애플리케이션',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${nanumGothic.variable} antialiased font-nanum bg-gray-50 text-gray-900`}>
        <div className="min-h-screen max-w-md mx-auto py-8 px-6 bg-white shadow-sm sm:my-6 sm:rounded-2xl flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
