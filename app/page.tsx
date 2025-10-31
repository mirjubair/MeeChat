'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const router = useRouter();

  // 🔹 Auto-redirect logged-in users to /chat
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) router.push('/chat');
    };
    checkSession();
  }, [router]);

  // 🔹 Send magic link with redirect to /chat
  const sendMagicLink = async () => {
    if (!email) return alert('Please provide an email');
    setSending(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo:
          typeof window !== 'undefined'
            ? `${window.location.origin}/chat`
            : 'http://localhost:3000/chat',
      },
    });
    setSending(false);
    if (error) alert(error.message);
    else alert('✅ Magic link sent — check your email!');
  };

  // 🔹 Continue anonymously
  const continueAnon = async () => {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) alert(error.message);
    else router.push('/chat');
  };

  return (
    <main className="h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md chat-bubble p-8">
        <h1 className="text-3xl font-bold text-accent mb-4">CodeChat</h1>
        <p className="text-sm text-muted mb-6">
          Dark coding-style chat (Next.js + Supabase)
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full mb-3 px-3 py-2 bg-code-panel rounded focus:outline-none"
        />

        <button
          onClick={sendMagicLink}
          disabled={sending}
          className="w-full py-2 rounded bg-accent text-black font-semibold mb-2"
        >
          {sending ? 'Sending...' : 'Send Magic Link'}
        </button>

        <button
          onClick={continueAnon}
          className="w-full py-2 rounded border border-white/5 text-sm"
        >
          Continue anonymously
        </button>

        <div className="mt-6 text-xs text-muted">
          After signing in, you’ll land in the chat. To use OAuth (e.g. GitHub),
          configure providers in Supabase.
        </div>
      </div>
    </main>
  );
}
