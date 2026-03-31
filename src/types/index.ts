export type MessageRole = "user" | "assistant";
// Type for Message
export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: Date;
}

// type for chat state
export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

// Next auth session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
    };
  }
}
