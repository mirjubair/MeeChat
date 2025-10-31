'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const router = useRouter();

  // 👇 Redirect user if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace('/chat');
      }
    };
    checkSession();

    // 👇 Listen for future login changes (magic link / anon / oauth)
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) router.replace('/chat');
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  const sendMagicLink = async () => {
    if (!email) return alert('Provide an email');
    setSending(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setSending(false);
    if (error) alert(error.message);
    else alert('Magic link sent — check your email');
  };

  const continueAnon = async () => {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) alert(error.message);
    // ✅ redirect now handled automatically by listener
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
          After signing in, you will land in the chat. To use OAuth (e.g., GitHub), configure providers in Supabase.
        </div>
      </div>
    </main>
  );
}
