'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatBox({ user }: { user: any }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let channel: any;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(500);

      if (!error && data) setMessages(data);
      setLoading(false);
    };

    fetchMessages();

    channel = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => channel?.unsubscribe?.();
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#0a0f14] text-gray-200">
      {loading ? (
        <div className="p-6 text-center">Loading messages...</div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4">
            <MessageList messages={messages} currentUser={user} />
          </div>
          <div className="border-t border-white/10">
            <MessageInput currentUser={user} />
          </div>
        </>
      )}
    </div>
  );
}
