"use client";
// import { useChat } from 'ai/react';

import { useChat } from "@ai-sdk/react";
import MessageInput from "./message-input";
import { useState } from "react";
import { DefaultChatTransport } from "ai";
import { Message } from "@/types";
import MessageList from "./message-list";

export default function ChatWindow() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  // import usechat to control everything
  const {
    messages: rawMessages,
    sendMessage,
    status,
  } = useChat({
    transport: new DefaultChatTransport({ api: "api/chat" }),
    onError: (err) => {
      console.log(err);
      setError("something went wrong! Please try again.");
    },
  });

  // handle loading
  const isLoading = status === "streaming" || status === "submitted";

  // message
  const messages: Message[] = rawMessages.map((m) => ({
    id: m.id,
    role: m.role as "user" | "assistant",
    content: m.parts
      .filter((p) => p.type === "text")
      .map((p) => (p as { type: "text"; text: string }).text)
      .join(""),
    createdAt: new Date(),
  }));

  //handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setError(null);
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen ">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold ">AI Chat</h2>
        <p className="text-xs">Powered by Groq</p>
      </div>
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-b border-red-200 px-6 py-3 flex items-center justify-between">
          <p className="text-sm text-red-600">{error}</p>
          <button
            className="text-red-400 hover:text-red-600 text-lg font-bold ml-4"
            onClick={() => setError(null)}
          >
            Close
          </button>
        </div>
      )}
      {/* messages */}
      <MessageList messages={messages} isLoading={isLoading} />
      {/* Message Input */}
      <MessageInput
        input={input}
        isLoading={isLoading}
        onInputChange={(e) => setInput(e.target.value)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
