import { useState } from "react";
import { Message, TranscriptChunk } from "../types";
import { MarkdownRenderer } from "./SummaryCard";
import { User, Sparkles, Play, Globe, ExternalLink, Copy } from "lucide-react";

interface MessageBubbleProps {
  key?: string;
  message: Message;
  onSeek: (seconds: number) => void;
  videoId?: string;
}

export default function MessageBubble({ message, onSeek, videoId }: MessageBubbleProps) {
  const isUser = message.sender === "user";
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy message:", err);
    }
  };

  const formatSeconds = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-6 animate-fade-in`}>
      <div className={`flex gap-3 max-w-[85%] sm:max-w-[78%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        
        {/* Avatar */}
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold shadow-sm ${
          isUser 
            ? "bg-slate-150 text-slate-700 dark:bg-slate-800 dark:text-slate-300" 
            : "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/15"
        }`}>
          {isUser ? <User className="h-4.5 w-4.5" /> : <Sparkles className="h-4.5 w-4.5 text-indigo-500" />}
        </div>

        {/* Bubble Layout */}
        <div className="flex flex-col gap-1.5">
          {/* Sender & Timestamp Header */}
          <div className={`flex items-center gap-2 text-[11px] font-medium text-slate-400 dark:text-slate-500 ${isUser ? "justify-end" : "justify-start"}`}>
            <span>{isUser ? "You" : "RAG Assistant"}</span>
            <span>•</span>
            <span>{message.timestamp}</span>
            {!isUser && (
              <>
                <span>•</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
                  title="Copy response to clipboard"
                >
                  {isCopied ? (
                    <span className="text-green-500 font-semibold flex items-center gap-0.5">Copied ✓</span>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>

          {/* Bubble content */}
          <div className={`rounded-2xl px-4 py-3.5 shadow-sm ${
            isUser
              ? "bg-gradient-to-r from-indigo-750 to-indigo-650 text-white font-medium"
              : "bg-slate-50 text-slate-800 border border-slate-200/60 dark:bg-slate-900/50 dark:border-slate-800 dark:text-slate-200"
          }`}>
            {isUser ? (
              <p className="text-sm whitespace-pre-wrap leading-relaxed select-text">{message.text}</p>
            ) : (
              <MarkdownRenderer text={message.text} onSeek={onSeek} videoId={videoId} />
            )}
          </div>

          {/* Source Citations panel (Perplexity Style) */}
          {!isUser && message.sources && message.sources.length > 0 && (
            <div className="mt-2.5">
              <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-1.5 flex items-center gap-1">
                <Globe className="h-3 w-3 text-indigo-500" /> RELEVANT TRANSCRIPT SOURCES ({message.sources.length})
              </div>
              
              <div className="flex flex-wrap gap-2">
                {message.sources.map((source, index) => (
                  <a
                    key={index}
                    href={videoId ? `https://www.youtube.com/watch?v=${videoId}&t=${Math.floor(source.start)}s` : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onSeek(source.start)}
                    className="flex items-center gap-1.5 text-left rounded-xl border border-slate-200 bg-white px-2.5 py-1.8 hover:border-indigo-500 hover:bg-indigo-50/20 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-950/20 transition-all cursor-pointer group shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 group-hover:scale-105 transition-transform shrink-0">
                      <Play className="h-2.5 w-2.5 fill-current" />
                    </div>
                    <div className="text-[11px] truncate max-w-[120px] sm:max-w-[180px]">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                        [{formatSeconds(source.start)}]
                      </span>{" "}
                      <span className="text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        {source.text}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
