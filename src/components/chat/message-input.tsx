import { useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
// import { Textarea } from "../ui/textarea";
interface MessageInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function MessageInput({
  input,
  isLoading,
  onInputChange,
  onSubmit,
}: MessageInputProps) {
  // input ref for focus on input
  const inputRef = useRef<HTMLInputElement>(null);
  // handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !input.trim()) return;
    onSubmit(e);
    inputRef.current?.focus;
  };
  return (
    <div className="border-t border-gray-200 px-4 py-4">
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-3xl mx-auto">
        <Input
          ref={inputRef}
          value={input}
          onChange={onInputChange}
          disabled={isLoading}
          autoComplete="off"
          className="flex-1 rounded-xl"
          placeholder="Ask any question...."
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="rounded-xl px-6"
        >
          {isLoading ? "..." : "Send"}
        </Button>
      </form>
      <p className="text-xs text-center text-gray-400 mt-2">
        AI can make mistakes. Double-check important information.
      </p>
    </div>
  );
}
