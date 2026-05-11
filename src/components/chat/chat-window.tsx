"use client";
// import { useChat } from 'ai/react';

import { useChat } from "@ai-sdk/react";
import MessageInput from "./message-input";
import { useState } from "react";
import { DefaultChatTransport } from "ai";
import { Message } from "@/types";
import MessageList from "./message-list";
import { Button } from "../ui/button";
import Link from "next/link";
import { Session } from "next-auth";
import Image from "next/image";

// Interface of chat window props
interface chatwindowprops {
  session: Session | null;
}

export default function ChatWindow({ session }: chatwindowprops) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  // console.log(session);

  // import usechat to control everything
  const {
    messages: rawMessages,
    sendMessage,
    status,
    stop,
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
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        {/* Logo */}
        <div className="">
          <h2 className="text-lg font-semibold ">AI Chat</h2>
          <p className="text-xs">Powered by Groq</p>
        </div>
        {/* Auth  section */}
        <div className="flex items-center gap-2">
          {session ? (
            <>
              <div className="flex flex-col items-center justify-center">
                {session.user.image && (
                  <Image
                    src={session?.user?.image}
                    alt="avatar"
                    className="w-7 h-7 rounded-full"
                    width={40}
                    height={40}
                  />
                )}
                <span>{session?.user?.name?.split(" ")[0]}</span>
              </div>
              {/* Sign out button */}
              <form>
                <Button type="submit" variant="outline">
                  Sign Out
                </Button>
              </form>
            </>
          ) : (
            <Link href={"/login"}>
              <Button variant="default" className="cursor-pointer">
                Sign In
              </Button>
            </Link>
          )}
        </div>
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
        stop={stop}
        input={input}
        isLoading={isLoading}
        onInputChange={(e) => setInput(e.target.value)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
