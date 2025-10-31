// components/ChatBox.tsx
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
        .order('inserted_at', { ascending: true })

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

    return () => {
      channel?.unsubscribe?.();
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      {loading ? (
        <div className="p-6 text-center">Loading messages...</div>
      ) : (
        <>
          <MessageList messages={messages} currentUser={user} />
          <MessageInput currentUser={user} onSent={() => {}} />
        </>
      )}
    </div>
  );
}
