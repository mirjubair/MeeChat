import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

// Load the Inter font
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NextChat — Modern Chat App',
  description: 'A sleek Telegram-like chat app built with Next.js and Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-[#0d0d0d] text-[#e6e6e6] min-h-screen flex flex-col`}
      >
        <header className="p-4 border-b border-gray-800 bg-[#0d0d0d]/80 backdrop-blur">
          <h1 className="text-lg font-semibold text-blue-400">NextChat</h1>
        </header>
        <main className="flex-1 flex flex-col overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
