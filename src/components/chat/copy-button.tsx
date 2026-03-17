"use client";

import { ClipboardCheck, Copy } from "lucide-react";
import { useState } from "react";
// interface for copy button props
interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  // handle copy
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error: unknown) {
      console.error(error);
    }
  };
  return (
    <button onClick={handleCopy}>
      {copied ? <ClipboardCheck /> : <Copy />}
    </button>
  );
}
