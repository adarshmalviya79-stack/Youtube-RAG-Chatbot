import { motion } from "motion/react";
import { Brain, Cpu, Database, Network, Search, GitBranch, Github, Linkedin, Mail, Sparkles, HelpCircle, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const steps = [
    {
      icon: Search,
      title: "1. Paste YouTube URL",
      desc: "User submits video URL. Our system extracts the unique 11-character video ID with regex patterns.",
      color: "text-indigo-500 bg-indigo-500/10"
    },
    {
      icon: Cpu,
      title: "2. Fetch & Synthesize",
      desc: "The server queries keyless metadata systems and uses Gemini to reconstruct detailed chronological transcripts.",
      color: "text-amber-500 bg-amber-500/10"
    },
    {
      icon: Database,
      title: "3. Chunk & Index",
      desc: "Transcript is divided into overlapping segment indices, mapping text with starting/ending duration in seconds.",
      color: "text-teal-500 bg-teal-500/10"
    },
    {
      icon: Network,
      title: "4. Semantic Similarity Search",
      desc: "User asks a question. A TF-IDF similarity vector matching parses transcript segments to rank top candidate context.",
      color: "text-blue-500 bg-blue-500/10"
    },
    {
      icon: Brain,
      title: "5. Prompt conditioning & LLM",
      desc: "Question + extracted context are formatted into safe prompts with strict instructions for citation mappings.",
      color: "text-purple-500 bg-purple-500/10"
    }
  ];

  const techStack = [
    { name: "Frontend", items: ["React 19 Hooks", "Vite JS Builder", "Tailwind CSS v4 Utility Classes", "Framer Motion Animations"] },
    { name: "Backend", items: ["Node.js with Express", "Gemini 3.5 Flash Model", "Google GenAI TypeScript SDK", "Public oEmbed APIs"] },
    { name: "SaaS Quality", items: ["Responsive layouts", "Timestamp Navigation", "Interactive Flow Charts", "Glassmorphism aesthetics"] }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 select-text">
      
      {/* Intro section */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50/50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/5 dark:text-indigo-400 backdrop-blur-sm"
        >
          <Brain className="h-3.5 w-3.5" /> Learning Retrieval-Augmented Generation (RAG)
        </motion.div>
        
        <h2 className="mt-4 font-sans text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          How Chatbot RAG Works
        </h2>
        <p className="mt-3.5 text-base text-slate-500 dark:text-slate-400">
          Understanding the technology stack, algorithmic flows, and citation-backed knowledge synthesis.
        </p>
      </div>

      {/* Concept Card */}
      <div className="mb-12 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-100/55 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-indigo-500" />
          What is Retrieval-Augmented Generation (RAG)?
        </h3>
        <p className="mt-3.5 text-sm leading-relaxed text-slate-600 dark:text-slate-350">
          Large Language Models excel at reasoning, but they lack awareness of real-time or private information. 
          <strong> RAG solved this limitation</strong>. Instead of asking the AI to guess from memory, 
          RAG retrieves relevant transcript chapters first, and feeds them as a fact-source context along with the question.
          This eliminates hallucination and guarantees the AI answers are backed by concrete proof.
        </p>
      </div>

      {/* Architecture Diagram Node Flow */}
      <div className="mb-12">
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-indigo-500 animate-pulse" />
          RAG Pipeline Execution Flow
        </h3>
        
        {/* Visual pipeline */}
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 dark:border-slate-850 dark:bg-slate-900/30">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold shadow-sm ${step.color}`}>
                <step.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-snug">{step.title}</h4>
                <p className="text-xs text-slate-550 dark:text-slate-400 mt-1">{step.desc}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="absolute left-9 bottom-[-16px] h-4 w-0.5 bg-slate-200 dark:bg-slate-800 hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Technology Specs Grid */}
      <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {techStack.map((tech, idx) => (
          <div key={idx} className="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900">
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-3.5">
              {tech.name}
            </h4>
            <ul className="space-y-2">
              {tech.items.map((item, i) => (
                <li key={i} className="text-xs font-semibold text-slate-750 dark:text-slate-350 flex items-center gap-1.5 list-none">
                  <span className="h-1 w-1 bg-indigo-400 rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Developer Profile Card (Portfolio Spec) */}
      <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-6 shadow-xl shadow-slate-100/50 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950 dark:shadow-none transition-all duration-300">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-750 via-blue-500 to-indigo-500 font-sans text-2xl font-black text-white shadow-lg shadow-indigo-500/20">
            AM
            <div className="absolute bottom-0 right-0 h-4.5 w-4.5 rounded-full bg-green-500 border-2 border-white dark:border-slate-900" title="Active Developer" />
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Sparkles className="h-3 w-3" /> Lead Software Engineer
            </div>
            <h3 className="text-lg font-bold tracking-tight text-slate-800 dark:text-white mt-1">
              Adarsh Malviya
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Curious Full Stack developer specializing in AI systems, LLM grounding models, and clean SaaS layout design. Built with micro-animations, semantic TF-IDF RAG filters, and dynamic media navigation.
            </p>

            <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">
              <a
                href="https://github.com/adarshmalviya"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 border border-slate-200 bg-white rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-350 dark:hover:text-white dark:hover:border-slate-600 transition-all cursor-pointer"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub Portfolio</span>
              </a>
              <a
                href="https://linkedin.com/in/adarsh-malviya"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 border border-slate-200 bg-white rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-350 dark:hover:text-white dark:hover:border-slate-600 transition-all cursor-pointer"
              >
                <Linkedin className="h-3.5 w-3.5" />
                <span>LinkedIn Connect</span>
              </a>
              <a
                href="mailto:adarshmalviya79@gmail.com"
                className="flex items-center gap-1.5 border border-slate-200 bg-white rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-350 dark:hover:text-white dark:hover:border-slate-600 transition-all cursor-pointer"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Email Channel</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
