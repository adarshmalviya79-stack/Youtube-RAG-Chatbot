import { useEffect, useRef } from "react";
import { Message } from "../types";
import MessageBubble from "./MessageBubble";
import { MessageSquare, Trash2, ShieldAlert, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

interface ChatContainerProps {
  messages: Message[];
  onSeek: (seconds: number) => void;
  onClearChat: () => void;
  isLoading: boolean;
  onSuggestedClick: (text: string) => void;
  videoId?: string;
}

export default function ChatContainer({ messages, onSeek, onClearChat, isLoading, onSuggestedClick, videoId }: ChatContainerProps) {
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isLoading]);

  const suggests = [
    "What is the main topic of this video?",
    "Can you summarize the second half?",
    "List the actionable takeaways with timestamps.",
    "Give me step by step guides explained here."
  ];

  return (
    <div className="flex flex-col h-[520px] rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-100/50 dark:border-slate-800/80 dark:bg-slate-900/60 dark:shadow-none overflow-hidden transition-all duration-300">
      
      {/* Header Panel */}
      <div className="flex items-center justify-between border-b border-slate-150 px-5 py-3.5 dark:border-slate-850">
        <div className="flex items-center gap-2">
          <div className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
            <MessageSquare className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-white">RAG Q&A Assistant</h3>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">Retrieval Augmented Generation Chat</p>
          </div>
        </div>

        {messages.length > 0 && (
          <button
            onClick={onClearChat}
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-indigo-950 dark:hover:bg-indigo-950/20 dark:hover:text-indigo-400 transition-all cursor-pointer"
            title="Clear Chat Conversation"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear Chat</span>
          </button>
        )}
      </div>

      {/* Message List Panel */}
      <div ref={listRef} className="flex-1 overflow-y-auto px-5 py-5 scroll-smooth divide-y-0 text-slate-800 dark:text-slate-250">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-10 px-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/5 text-indigo-600 mb-4 animate-bounce">
              <MessageSquare className="h-6 w-6" />
            </div>
            
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">Start Chatting with Video Context</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
              The video's context is fully indexed and converted to vector segments. Type your question below to retrieve the exact answers with clickable citations!
            </p>

            {/* Suggested Questions */}
            <div className="mt-6 w-full max-w-md">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase block mb-3">
                SUGGESTED QUESTIONS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggests.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSuggestedClick(prompt)}
                    className="text-left text-xs bg-slate-50/50 border border-slate-200/55 rounded-xl px-3 py-2.5 hover:border-indigo-500 hover:bg-indigo-50/10 dark:bg-slate-950/40 dark:border-slate-800/80 dark:hover:border-indigo-500/20 text-slate-650 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-950/80 dark:hover:text-white cursor-pointer transition-all leading-tight"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} onSeek={onSeek} videoId={videoId} />
            ))}

            {/* AI Reasoning Loading Bubble */}
            {isLoading && (
              <div className="flex gap-3 max-w-[80%] flex-row mb-6 animate-pulse">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
                  <Sparkles className="h-4.5 w-4.5 animate-spin" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="text-[11px] font-medium text-slate-400">RAG Assistant is searching segments...</div>
                  <div className="rounded-2xl border border-slate-200/60 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/50 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin text-indigo-500" />
                    <span>Analyzing matching transcript sources, computing weights, synthesizing citation response...</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
