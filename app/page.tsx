// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const router = useRouter();

  // ✅ Detect magic link session from URL
  useEffect(() => {
    const handleRedirectSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) router.push('/chat');
    };
    handleRedirectSession();
  }, [router]);

  const sendMagicLink = async () => {
    if (!email) return alert('Provide an email');
    setSending(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}` } // redirects back to this page
    });
    setSending(false);
    if (error) alert(error.message);
    else alert('Magic link sent — check your email');
  };

  const continueAnon = async () => {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) alert(error.message);
    else router.push('/chat');
  };

  return (
    <main className="h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-4 text-center">MyChatApp 💬</h1>
        <p className="text-sm text-gray-400 mb-6 text-center">Secure login to chat</p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full mb-3 px-3 py-2 bg-gray-700 rounded focus:outline-none"
        />

        <button
          onClick={sendMagicLink}
          disabled={sending}
          className="w-full py-2 mb-3 rounded bg-blue-500 hover:bg-blue-600 font-semibold"
        >
          {sending ? 'Sending...' : 'Send Magic Link'}
        </button>

        <button
          onClick={continueAnon}
          className="w-full py-2 rounded border border-gray-600 hover:bg-gray-700 text-sm"
        >
          Continue anonymously
        </button>

        <div className="mt-6 text-xs text-gray-400 text-center">
          After signing in, you’ll land in chat automatically.
        </div>
      </div>
    </main>
  );
}
