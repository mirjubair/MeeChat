export default function MessageList({ messages, currentUser }: { messages: any[], currentUser: any }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.user_id === currentUser?.id ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm ${
              msg.user_id === currentUser?.id
                ? 'bg-indigo-500 text-white rounded-br-none'
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}
          >
            {msg.file_url ? (
              <div className="flex flex-col gap-2">
                {msg.file_url.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <img src={msg.file_url} alt="file" className="max-h-60 rounded-lg" />
                ) : (
                  <a
                    href={msg.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-sm text-blue-200 hover:text-blue-100"
                  >
                    📎 Download file
                  </a>
                )}
              </div>
            ) : (
              <p>{msg.content}</p>
            )}
            <span className="text-xs opacity-70 block mt-1">
              {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
