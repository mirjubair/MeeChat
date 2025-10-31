'use client';

import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { FiLogOut, FiPhone, FiVideo } from 'react-icons/fi';

export default function Header({ user }: { user: any }) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <header className="flex items-center justify-between p-4 bg-[#0d1218] border-b border-white/10">
      <h1 className="text-lg font-semibold text-accent">MeeChat 💬</h1>
      <div className="flex items-center gap-4 text-gray-300">
        <button title="Voice Call">
          <FiPhone className="hover:text-accent" size={20} />
        </button>
        <button title="Video Call">
          <FiVideo className="hover:text-accent" size={20} />
        </button>
        <button onClick={handleLogout} title="Logout">
          <FiLogOut className="hover:text-accent" size={20} />
        </button>
      </div>
    </header>
  );
}
