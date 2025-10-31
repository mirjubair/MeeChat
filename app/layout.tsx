import '../styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MeeChat 💬',
  description: 'A sleek real-time chat built with Next.js & Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0f14] text-white h-screen flex flex-col overflow-hidden">
        {children}
      </body>
    </html>
  );
}
