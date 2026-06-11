import React, { useState, KeyboardEvent } from "react";
import { Send, CornerDownLeft } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

export default function ChatInput({ onSendMessage, isLoading, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim() || isLoading || disabled) return;
    onSendMessage(message);
    setMessage("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-100/50 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none transition-all duration-200">
        <input
          type="text"
          className="flex-1 bg-transparent px-4 py-3 text-sm text-slate-800 outline-none placeholder-slate-400 dark:text-slate-100 dark:placeholder-slate-500 disabled:opacity-60"
          placeholder={disabled ? "Please index a YouTube video to begin chat..." : "Ask any question about the video's transcript..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isLoading}
          maxLength={1000}
        />

        <button
          onClick={handleSend}
          disabled={!message.trim() || isLoading || disabled}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-indigo-500/30 disabled:opacity-50 disabled:bg-slate-300 disabled:shadow-none dark:disabled:bg-slate-800 dark:disabled:text-slate-600 cursor-pointer transition-all"
          title="Send query"
        >
          <Send className="h-4.5 w-4.5" />
        </button>
      </div>

      <div className="flex items-center justify-between px-3 mt-2 text-[10px] text-slate-400 dark:text-slate-500 font-medium">
        <span>Enter to send • Shift+Enter for newline</span>
        <span>{message.length}/1000 chars</span>
      </div>
    </div>
  );
}
