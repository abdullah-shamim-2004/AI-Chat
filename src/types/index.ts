export type MessageRole = "user" | "assistant";
// Type for Message
export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  creatAt: Date;
}

// type for chat state
export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
