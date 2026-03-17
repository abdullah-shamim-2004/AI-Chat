export default function TypingIndicator() {
  return (
    <div className="flex gap-1 items-center px-4 py-3">
      <div className="flex gap-1 ">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
      </div>
      <span className="text-sm text-gray-400 ml-1">AI is thinking...</span>
    </div>
  );
}
