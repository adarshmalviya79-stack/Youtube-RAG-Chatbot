import React, { useState } from "react";
import { Play, Search, AlertCircle, Loader2, Sparkles, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

interface VideoLoaderCardProps {
  onLoadVideo: (url: string) => void;
  isLoading: boolean;
  error: string | null;
}

export default function VideoLoaderCard({ onLoadVideo, isLoading, error }: VideoLoaderCardProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onLoadVideo(url);
  };

  const handleSampleClick = (sampleUrl: string) => {
    setUrl(sampleUrl);
    onLoadVideo(sampleUrl);
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-100/50 dark:border-slate-800/80 dark:bg-slate-900 dark:shadow-none transition-all duration-300">
      <div className="mb-4">
        <h2 className="text-lg font-bold tracking-tight text-slate-800 dark:text-white flex items-center gap-2">
          <Play className="h-5 w-5 text-indigo-600 fill-indigo-600" />
          Load YouTube Video
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Paste any YouTube URL (tutorial, interview, educational video, music video) to fetch, index, and query its transcripts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none ring-offset-white focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:border-indigo-400 dark:focus:bg-slate-900 transition-all duration-200"
            placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/15 hover:from-indigo-500 hover:to-blue-500 hover:shadow-indigo-500/25 active:scale-[0.99] disabled:opacity-70 disabled:scale-100 cursor-pointer transition-all duration-200"
          disabled={isLoading || !url.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4.5 w-4.5 animate-spin" />
              <span>Analyzing Video and Synthesizing Transcript...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4.5 w-4.5 text-yellow-300" />
              <span>Load, Index & Generate Summary</span>
            </>
          )}
        </button>
      </form>

      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50/70 p-3.5 text-xs text-red-700 dark:border-red-950/50 dark:bg-red-950/20 dark:text-red-300"
        >
          <AlertCircle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Analysis failed:</span> {error}
          </div>
        </motion.div>
      )}

      {/* Sample presets for fast user testing */}
      <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800/80">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-2">
          <HelpCircle className="h-3.5 w-3.5 text-slate-400" /> Quick Samples (Click one to test instantly):
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSampleClick("https://www.youtube.com/watch?v=Ke90Tje7VS0")}
            disabled={isLoading}
            className="rounded-lg bg-slate-50 border border-slate-200/60 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-800/40 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-all cursor-pointer"
          >
            React 19 Hooks Guide
          </button>
          <button
            onClick={() => handleSampleClick("https://www.youtube.com/watch?v=SqcY0GlETPk")}
            disabled={isLoading}
            className="rounded-lg bg-slate-50 border border-slate-200/60 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-800/40 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-all cursor-pointer"
          >
            Retrieval-Augmented Generation (RAG) Explained
          </button>
          <button
            onClick={() => handleSampleClick("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}
            disabled={isLoading}
            className="rounded-lg bg-slate-50 border border-slate-200/60 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-800/40 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-all cursor-pointer"
          >
            Rick Astley - Never Gonna Give You Up
          </button>
        </div>
      </div>
    </div>
  );
}
