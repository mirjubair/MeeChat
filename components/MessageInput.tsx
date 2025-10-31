// components/MessageInput.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

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
    </div>
  );
}
