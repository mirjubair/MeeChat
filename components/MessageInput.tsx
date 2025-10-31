'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function MessageInput({
  currentUser,
  onSent, // ✅ now accepted
}: {
  currentUser: any;
  onSent?: () => void; // ✅ optional so no error
}) {
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

  const sendMessage = async () => {
    if (!text.trim()) return;
    setSending(true);
    const { error } = await supabase.from('messages').insert({
      content: text,
      user_id: currentUser?.id || 'anonymous',
    });
    setSending(false);
    if (!error) {
      setText('');
      onSent?.(); // ✅ safely call if passed
    } else {
      alert(error.message);
    }
  };

  return (
    <div className="p-3 border-t border-white/10 flex items-center gap-2 bg-code-panel">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-transparent border border-white/5 rounded p-2 focus:outline-none text-sm"
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button
        onClick={sendMessage}
        disabled={sending}
        className="bg-accent text-black font-semibold px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
}
