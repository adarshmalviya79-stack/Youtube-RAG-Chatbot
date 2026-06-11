import { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp, Copy, Check, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SummaryCardProps {
  summary: string;
  onSeek: (seconds: number) => void;
  videoId?: string;
}

// Custom Markdown formatter that parses inline timestamps like [01:23] or [00:45] into clickable citation badges
export function MarkdownRenderer({ text, onSeek, videoId }: { text: string; onSeek: (seconds: number) => void; videoId?: string }) {
  if (!text) return null;

  // Helper to parse time string [MM:SS] or [HH:MM:SS] to seconds
  const parseTimeToSeconds = (timeStr: string): number | null => {
    const clean = timeStr.replace(/[\[\]]/g, "").trim();
    const parts = clean.split(":").map(Number);
    if (parts.some(isNaN)) return null;
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return null;
  };

  const lines = text.split("\n");

  const parseInlineElements = (lineText: string) => {
    // Regex to capture timestamp pattern: [01:23] or [12:34] or [0:45]
    const timestampRegex = /(\[\d{1,2}:\d{2}\]|\[\d{1,2}:\d{2}:\d{2}\])/g;
    const parts = lineText.split(timestampRegex);

    return parts.map((part, index) => {
      if (timestampRegex.test(part)) {
        const secs = parseTimeToSeconds(part);
        if (secs !== null) {
          return (
            <a
              key={index}
              href={videoId ? `https://www.youtube.com/watch?v=${videoId}&t=${secs}s` : undefined}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                onSeek(secs);
              }}
              className="mx-1 inline-flex items-center gap-0.5 rounded-md bg-indigo-50 px-1.5 py-0.5 text-xs font-bold text-indigo-600 hover:bg-indigo-600 hover:text-white dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500 dark:hover:text-white transition-all cursor-pointer font-mono"
            >
              {part}
            </a>
          );
        }
      }

      // Handle bold **text** nested within
      const boldRegex = /(\*\*[^*]+\*\*)/g;
      const subParts = part.split(boldRegex);

      return subParts.map((subPart, subIndex) => {
        if (boldRegex.test(subPart)) {
          const boldText = subPart.substring(2, subPart.length - 2);
          return (
            <strong key={`${index}-${subIndex}`} className="font-bold text-slate-800 dark:text-slate-100">
              {boldText}
            </strong>
          );
        }

        // Handle raw `inline code`
        const codeRegex = /`([^`]+)`/g;
        const codeParts = subPart.split(codeRegex);
        return codeParts.map((cPart, cIdx) => {
          if (cIdx % 2 === 1) {
            return (
              <code key={cIdx} className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs text-indigo-600 dark:bg-slate-850 dark:text-indigo-400">
                {cPart}
              </code>
            );
          }
          return cPart;
        });
      });
    });
  };

  return (
    <div className="space-y-3 font-sans text-sm leading-relaxed text-slate-650 dark:text-slate-300">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();

        // Header 3: "### Heading"
        if (trimmed.startsWith("### ")) {
          return (
            <h5 key={lineIdx} className="text-sm font-bold text-slate-850 dark:text-white pt-2 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
              {parseInlineElements(trimmed.substring(4))}
            </h5>
          );
        }

        // Header 2: "## Heading"
        if (trimmed.startsWith("## ")) {
          return (
            <h4 key={lineIdx} className="text-base font-extrabold text-slate-850 dark:text-white pt-3 border-b border-slate-100 dark:border-slate-850 pb-1">
              {parseInlineElements(trimmed.substring(3))}
            </h4>
          );
        }

        // Header 1: "# Heading"
        if (trimmed.startsWith("# ")) {
          return (
            <h3 key={lineIdx} className="text-lg font-extrabold text-slate-900 dark:text-white pt-4">
              {parseInlineElements(trimmed.substring(2))}
            </h3>
          );
        }

        // Bullet point: "- " or "* "
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-3">
              <span className="text-indigo-500 mt-1.5 shrink-0 select-none">•</span>
              <span className="flex-1">{parseInlineElements(trimmed.substring(2))}</span>
            </div>
          );
        }

        // Blank lines
        if (trimmed === "") {
          return <div key={lineIdx} className="h-2" />;
        }

        // Standard Paragraph
        return (
          <p key={lineIdx} className="text-slate-650 dark:text-slate-300">
            {parseInlineElements(line)}
          </p>
        );
      })}
    </div>
  );
}

export default function SummaryCard({ summary, onSeek, videoId }: SummaryCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy summary:", err);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-100/50 dark:border-slate-800/80 dark:bg-slate-900/60 dark:shadow-none transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
            <Sparkles className="h-4.5 w-4.5" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-slate-800 dark:text-white">AI Video Summary</h3>
            <p className="text-[10px] text-slate-450 dark:text-slate-400">Structured takeaways and outline</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center rounded-lg border border-slate-200/80 p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-all cursor-pointer"
            title="Copy summary to clipboard"
          >
            {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center rounded-lg border border-slate-200/80 p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-all cursor-pointer"
            title={isExpanded ? "Collapse Summary" : "Expand Summary"}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-850">
              <MarkdownRenderer text={summary} onSeek={onSeek} videoId={videoId} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
