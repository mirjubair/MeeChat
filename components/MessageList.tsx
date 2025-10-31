export default function MessageList({
  messages,
  currentUser,
}: {
  messages: any[];
  currentUser: any;
}) {
  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${
            msg.user_id === currentUser?.id ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-xs px-3 py-2 rounded-2xl text-sm ${
              msg.user_id === currentUser?.id
                ? 'bg-accent text-black'
                : 'bg-[#1a212b] text-gray-200'
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
}
