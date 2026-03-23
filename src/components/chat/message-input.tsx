import { useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Square } from "lucide-react";
// import { Textarea } from "../ui/textarea";
interface MessageInputProps {
  input: string;
  stop: () => void;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function MessageInput({
  input,
  stop,
  isLoading,
  onInputChange,
  onSubmit,
}: MessageInputProps) {
  // input ref for focus on input
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="border-t border-gray-200 px-4 py-4">
      <form onSubmit={onSubmit} className="flex gap-2 max-w-3xl mx-auto">
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
          {isLoading ? (
            <Square className="text-red-700" onClick={stop} />
          ) : (
            "Send"
          )}
        </Button>
      </form>
      <p className="text-xs text-center text-gray-400 mt-2">
        AI can make mistakes. Double-check important information.
      </p>
    </div>
  );
}
