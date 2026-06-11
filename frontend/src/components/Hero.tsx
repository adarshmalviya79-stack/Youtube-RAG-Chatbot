import { motion } from "motion/react";
import { Sparkles, MessageSquare, BrainCircuit, Search } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden py-10 sm:py-16 text-center">
      {/* Background glowing blurred decorative dots */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-500/5" />
      <div className="absolute top-1/3 left-1/4 -z-10 h-48 w-48 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/5 animate-pulse" />

      {/* Floating Sparkles Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50/50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/5 dark:text-indigo-400 backdrop-blur-sm"
      >
        <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-spin-slow" />
        SaaS Professional Redesign
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-6 font-sans text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl"
      >
        Chat With Any{" "}
        <span className="bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent italic">
          YouTube Video
        </span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mx-auto mt-6 max-w-2xl text-base text-slate-600 dark:text-slate-400 sm:text-lg md:text-xl"
      >
        Transform videos into searchable, interactive knowledge structures using AI-powered{" "}
        <span className="font-semibold text-slate-800 dark:text-slate-200">Retrieval Augmented Generation</span>.
      </motion.p>

      {/* Key Features/Flow Indicators with Hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-10 grid grid-cols-2 gap-4 max-w-lg mx-auto sm:grid-cols-4 px-4 sm:px-0"
      >
        <div className="flex flex-col items-center p-3 rounded-xl bg-slate-50 border border-slate-100/80 dark:bg-slate-800/20 dark:border-slate-800/50 hover:scale-105 transition-all">
          <Search className="h-5 w-5 text-indigo-500 mb-1" />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">1. Paste URL</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-slate-50 border border-slate-100/80 dark:bg-slate-800/20 dark:border-slate-800/50 hover:scale-105 transition-all">
          <BrainCircuit className="h-5 w-5 text-blue-500 mb-1" />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">2. Index RAG</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-slate-50 border border-slate-100/80 dark:bg-slate-800/20 dark:border-slate-800/50 hover:scale-105 transition-all">
          <Sparkles className="h-5 w-5 text-indigo-500 mb-1" />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">3. AI Summary</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-slate-50 border border-slate-100/80 dark:bg-slate-800/20 dark:border-slate-800/50 hover:scale-105 transition-all">
          <MessageSquare className="h-5 w-5 text-teal-500 mb-1" />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">4. Cite Chat</span>
        </div>
      </motion.div>
    </div>
  );
}
