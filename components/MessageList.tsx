// components/MessageList.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import dayjs from 'dayjs';

interface Message {
  id: string;
  content: string;
  sender_id?: string | null;
  created_at: string;
  attachments?: any;
}

export default function MessageList({ messages, currentUser }: { messages: Message[]; currentUser: any; }) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((m) => {
        const mine = m.sender_id === currentUser?.id;
        return (
          <div key={m.id} className={mine ? 'flex justify-end' : 'flex justify-start'}>
            <div className={`max-w-[70%] p-3 rounded-lg ${mine ? 'bg-[rgba(0,230,168,0.06)]' : 'bg-white/3'}`}>
              <div className="text-xs text-muted mb-1 flex items-center justify-between">
                <div className="font-semibold text-sm">{(m.sender_id ?? 'anon').slice(0,6)}</div>
                <div className="text-xs">{dayjs(m.created_at).format('HH:mm')}</div>
              </div>
              <div className="whitespace-pre-wrap text-sm">{m.content}</div>
              {m.attachments && <div className="mt-2 text-xs text-muted">Attachments: {JSON.stringify(m.attachments)}</div>}
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
