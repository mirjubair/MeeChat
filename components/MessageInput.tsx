'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { FiSend, FiPaperclip, FiSmile, FiMic } from 'react-icons/fi';

<<<<<<< HEAD
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
=======
export default function MessageInput({ chatId, currentUser, onSent }: { chatId?: string; currentUser: any; onSent?: () => void; }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);

  const send = async () => {
    if (!text.trim() && !file) return;
    setSending(true);

    let attachments = null;
    if (file) {
      try {
        const path = `${chatId ?? 'general'}/${Date.now()}_${file.name}`;
        const upload = await supabase.storage.from('attachments').upload(path, file);
        if (upload.error) throw upload.error;
        const publicUrl = supabase.storage.from('attachments').getPublicUrl(upload.data.path).data.publicUrl;
        attachments = [{ name: file.name, url: publicUrl, size: file.size }];
      } catch (err) {
        console.error('Upload error', err);
      }
    }

    const { error } = await supabase.from('messages').insert({
      chat_id: chatId ?? null,
      sender_id: currentUser?.id ?? null,
      content: text.trim(),
      attachments
    });

    setSending(false);
    if (error) {
      console.error(error);
      alert('Send failed');
    } else {
      setText('');
      setFile(null);
      if (onSent) onSent();
    }
  };

  return (
    <div className="p-3 border-t border-white/5 bg-code-panel">
      <div className="flex gap-2 items-center">
        <input
          id="file"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="text-xs text-muted"
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Type a message..."
          className="flex-1 bg-transparent border border-white/6 p-3 rounded text-sm focus:outline-none"
        />
        <button onClick={send} className="ml-2 px-4 py-2 rounded bg-accent text-black font-bold" disabled={sending}>
          {sending ? '...' : 'Send'}
        </button>
      </div>
>>>>>>> parent of 2ba93b1 (update chatbox and msg input)
    </div>
  );
}
