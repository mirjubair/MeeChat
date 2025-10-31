// components/Header.tsx
'use client';

import { supabase } from '../lib/supabaseClient';

import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';

export default function Header({ user }: { user: any }) {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-code-panel border-b border-white/5">
      <div>
        <div className="text-accent font-bold">CodeChat</div>
        <div className="text-xs text-muted">Dark coding-style chat</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-sm text-muted">{user.email ?? 'Anonymous'}</div>
        <button onClick={logout} title="Sign out" className="p-2 rounded hover:bg-white/2">
          <FiLogOut className="text-accent" />
        </button>
      </div>
    </div>
  );
}
