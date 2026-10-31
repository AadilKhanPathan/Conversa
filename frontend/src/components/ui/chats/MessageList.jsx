import MessageBubble from "./MessageBubble";
import { useAuth } from "@/Context/AuthContext";

export default function MessageList({ messages }) {
  const { authUser } = useAuth();
  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto bg-transparent px-3 py-6 sm:px-6 scrollbar-none">
      <div className="flex justify-center">
        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-400 shadow-sm ring-1 ring-slate-200/70">
          Today
        </span>
      </div>

      {/* Received Message */}
      {messages.map((message) => (
        <MessageBubble
          key={message._id}
          isSentByMe={String(message.senderId) === String(authUser._id)}
          message={message}
        />
      ))}
    </div>
  );
}
