import { Message } from "@/types";
import CopyButton from "./copy-button";

// message interface
interface MessageBubbleProps {
  message: Message;
}
export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  return (
    <div
      className={`flex w-full mb-4 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {/* Avatar */}
      <div
        className={`flex items-start gap-2 max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
            isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {isUser ? "U" : "AI"}
        </div>

        {/* Bubble */}
        <div
          className={`group relative rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-blue-600 text-white rounded-tr-sm"
              : "bg-gray-100 text-gray-900 rounded-tl-sm"
          }`}
        >
          {/* Message text */}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>

          {/* Copy button - only on AI messages */}
          {!isUser && (
            <div className="absolute -bottom-6 left-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <CopyButton text={message.content} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
