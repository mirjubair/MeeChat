'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { FiSend, FiPaperclip, FiSmile, FiMic } from 'react-icons/fi';

export default function MessageInput({ currentUser }: { currentUser: any }) {
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
    if (!error) setText('');
    else alert(error.message);
  };

  return (
    <div className="flex items-center gap-2 p-3 bg-[#11161d]">
      <button className="text-gray-400 hover:text-accent">
        <FiPaperclip size={20} />
      </button>
      <button className="text-gray-400 hover:text-accent">
        <FiSmile size={20} />
      </button>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-[#0d1218] border border-white/5 rounded-xl px-3 py-2 text-sm focus:outline-none"
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button
        onClick={sendMessage}
        disabled={sending}
        className="bg-accent hover:opacity-80 text-black font-semibold p-2 rounded-xl"
      >
        <FiSend size={18} />
      </button>
      <button className="text-gray-400 hover:text-accent">
        <FiMic size={20} />
      </button>
    </div>
  );
}
