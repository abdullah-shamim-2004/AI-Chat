"use client";

import { Message } from "@/types";
import { useEffect, useRef } from "react";
import MessageBubble from "./message-bubble";
import TypingIndicator from "./typing-indicator";

// interface for message-list-props
interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}
export default function MessageList({ messages, isLoading }: MessageListProps) {
  // useRef for smooth scroll
  const bottomRef = useRef<HTMLDivElement>(null);
  // smooth Scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Empty State
  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col justify-center items-center text-center p-8">
        <h2 className="text-xl font-semibold mb-2">Start a conversation</h2>
        <p className="text-sm">Ask me anything, I am here to help.</p>
      </div>
    );
  }
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      {/* Render all messages */}
      {messages.map((message) => (
        <MessageBubble message={message} key={message.id}></MessageBubble>
      ))}

      {/* Show Loading indicator */}
      {isLoading && <TypingIndicator />}

      {/* invisible div for scroll */}
      <div ref={bottomRef}></div>
    </div>
  );
}
