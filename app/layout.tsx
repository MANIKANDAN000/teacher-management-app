// src/app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Teacher Management Dashboard',
  description: 'A modern interface for managing teachers, built with Next.js.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* THIS IS THE NEW LINE YOU MUST ADD */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-slate-50">
          {children}
        </div>
      </body>
    </html>
  );
}