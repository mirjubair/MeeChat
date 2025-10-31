// components/MessageInput.tsx
'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function MessageInput({ currentUser, onSent }: { currentUser: any; onSent: () => void }) {
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    setSending(true);
    const { error } = await supabase.from('messages').insert({
      user_id: currentUser?.id,
      content: newMessage.trim(),
    });
    setSending(false);

    if (error) {
      alert('Send failed: ' + error.message);
    } else {
      setNewMessage('');
      onSent();
    }
  };

  return (
    <div className="p-4 flex border-t border-white/10 bg-code-panel">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
        className="flex-1 p-2 rounded bg-black/40 focus:outline-none"
      />
      <button
        onClick={sendMessage}
        disabled={sending}
        className="ml-2 px-4 py-2 rounded bg-accent text-black font-semibold"
      >
        {sending ? '...' : 'Send'}
      </button>
    </div>
  );
}
