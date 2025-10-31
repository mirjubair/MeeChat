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

    return () => {
      channel?.unsubscribe?.();
    };
  }, []);

  return (
    <div className="flex flex-col h-[90vh] w-full bg-gradient-to-b from-gray-50 to-gray-200 rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">💬 Chat Room</h2>
        <div className="flex gap-3">
          <button className="bg-indigo-500 hover:bg-indigo-400 text-sm px-3 py-1 rounded-md">📞 Call</button>
          <button className="bg-indigo-500 hover:bg-indigo-400 text-sm px-3 py-1 rounded-md">🎥 Video</button>
        </div>
      </div>

      {loading ? (
        <div className="p-6 text-center text-gray-500">Loading messages...</div>
      ) : (
        <>
          <MessageList messages={messages} currentUser={user} />
          <MessageInput currentUser={user} onSent={() => {}} />

        </>
      )}
    </div>
  );
}
