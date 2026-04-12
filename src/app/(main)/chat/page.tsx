import ChatWindow from "@/components/chat/chat-window";
import { auth } from "@/lib/auth";

export default async function chatPage() {
  const session = await auth();
  return <ChatWindow session={session} />;
}
