'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import Header from '../../components/Header';
import ChatBox from '../../components/ChatBox';

export default function ChatPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) router.push('/');
      else setUser(data.user);
    };
    getUser();
  }, [router]);

  return (
    <div className="flex flex-col h-screen">
      <Header user={user} />
      <div className="flex-1 overflow-hidden">
        <ChatBox user={user} />
      </div>
    </div>
  );
}
