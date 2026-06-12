import { motion } from "motion/react";
import { 
  Brain, Cpu, Database, Network, Search, GitBranch, 
  Github, Linkedin, Mail, Sparkles, HelpCircle, ArrowRight,
  Youtube, Download, Scissors, MessageSquare, Clock 
} from "lucide-react";

export default function AboutPage() {
  const steps = [
    {
      icon: Youtube,
      title: "1. Paste YouTube URL",
      desc: "The user submits a valid YouTube URL. The system validates and extracts the unique 11-character video ID using regex patterns.",
      color: "text-indigo-500 bg-indigo-500/10"
    },
    {
      icon: Download,
      title: "2. Fetch Transcript",
      desc: "The backend uses Supadata to retrieve the complete chronological transcript and accurate time index maps of the video.",
      color: "text-amber-500 bg-amber-500/10"
    },
    {
      icon: Scissors,
      title: "3. Chunk & Index",
      desc: "The retrieved transcript is divided into overlapping semantic text chunks to maintain contextual coherence across segments.",
      color: "text-teal-500 bg-teal-500/10"
    },
    {
      icon: Cpu,
      title: "4. Generate Embeddings",
      desc: "Local high-dimensional vector embeddings are generated for each chunk using Xenova Transformers with the all-MiniLM-L6-v2 model.",
      color: "text-blue-500 bg-blue-500/10"
    },
    {
      icon: Database,
      title: "5. Store in MongoDB",
      desc: "The text chunks and their respective vector embeddings are stored and indexed in a MongoDB Atlas database.",
      color: "text-purple-500 bg-purple-500/10"
    },
    {
      icon: MessageSquare,
      title: "6. User Asks Question",
      desc: "The user enters a natural language query about the video content via the interactive chat interface.",
      color: "text-indigo-500 bg-indigo-500/10"
    },
    {
      icon: Search,
      title: "7. Semantic Retrieval",
      desc: "The query is embedded locally and a Cosine Similarity search matches it against stored vector chunks in MongoDB Atlas to find the most relevant contexts.",
      color: "text-amber-500 bg-amber-500/10"
    },
    {
      icon: Network,
      title: "8. Route to LLM",
      desc: "The matched context chunks and the user's query are formatted into a prompt and securely routed to DeepSeek through OpenRouter.",
      color: "text-teal-500 bg-teal-500/10"
    },
    {
      icon: Brain,
      title: "9. Grounded Answer Synthesis",
      desc: "The DeepSeek model processes the query and dynamically generates an answer strictly grounded in the retrieved transcript context, avoiding hallucinations.",
      color: "text-blue-500 bg-blue-500/10"
    },
    {
      icon: Clock,
      title: "10. Return Answer & Sources",
      desc: "The response is delivered to the user complete with interactive, clickable timestamp citations mapping directly to source points in the video player.",
      color: "text-purple-500 bg-purple-500/10"
    }
  ];

  const techStack = [
    { name: "Frontend Stack", items: ["React Framework", "TypeScript Syntax", "Vite JS Builder", "Tailwind CSS Styling"] },
    { name: "Backend Stack", items: ["Node.js Server", "Express.js Routing", "MongoDB Atlas Database", "Supadata Transcript API"] },
    { name: "AI Pipeline & Dev", items: ["Xenova Transformers", "all-MiniLM-L6-v2 Embeddings", "Cosine Similarity Search", "DeepSeek via OpenRouter", "Render Hosting"] }
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
        <p className="mt-3.5 text-base text-slate-600 dark:text-slate-300">
          Understanding the technology stack, algorithmic flows, and citation-backed knowledge synthesis.
        </p>
      </div>

      {/* Concept Card */}
      <div className="mb-12 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-100/55 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-indigo-500" />
          What is Retrieval-Augmented Generation (RAG)?
        </h3>
        <p className="mt-3.5 text-sm leading-relaxed text-slate-600 dark:text-slate-200">
          Large Language Models excel at reasoning, but they lack awareness of real-time or private information. 
          <strong> RAG solves this limitation</strong>. Instead of asking the AI to guess from memory, 
          RAG retrieves relevant transcript segments first, and feeds them as a fact-source context along with the question.
          This eliminates hallucination and guarantees that the AI's answers are backed by concrete proof.
        </p>
      </div>

      {/* Why RAG Section */}
      <div className="mb-12 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-100/55 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse" />
          Why RAG is Important
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-200">
          Traditional Large Language Models (LLMs) are static and require extremely expensive training on massive datasets. Retraining a foundation model every time new information arrives is financially and logistically prohibitive, costing millions of dollars. Additionally, model context windows are limited, and static models quickly become outdated.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: The Challenge */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100/80 dark:bg-slate-950/20 dark:border-slate-850">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              The Limits of Traditional LLMs
            </h4>
            <ul className="mt-3.5 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 shrink-0">•</span>
                <span><strong>Outdated Knowledge:</strong> Pre-training models are static and cannot access real-time information.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 shrink-0">•</span>
                <span><strong>Prohibitive Training Costs:</strong> Training foundation models costs millions of dollars; retraining them whenever new data arrives is financially unsustainable.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 shrink-0">•</span>
                <span><strong>Context Constraints:</strong> Context windows are limited, making it impossible to input massive files, videos, or full databases into every prompt.</span>
              </li>
            </ul>
          </div>

          {/* Column 2: The Solution */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100/80 dark:bg-slate-950/20 dark:border-slate-850">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              How RAG Solves the Problem
            </h4>
            <ul className="mt-3.5 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-green-500 shrink-0">•</span>
                <span><strong>Cost Reduction:</strong> Retrieves only relevant context chunks, drastically lowering token usage and query-time inference costs.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-green-500 shrink-0">•</span>
                <span><strong>Zero Retraining:</strong> Operates entirely without model retraining by piping factual source information dynamically.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-green-500 shrink-0">•</span>
                <span><strong>Scalable & Grounded:</strong> Minimizes hallucination by forcing responses to be grounded directly in external knowledge bases.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Business/Enterprise Impact Footer inside Card */}
        <div className="mt-6 pt-5 border-t border-slate-150 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
          <strong className="text-slate-700 dark:text-slate-200">Real-World Enterprise Value:</strong> Today, companies leverage RAG architectures to decrease customer support operational costs, improve internal answer accuracy, keep knowledge bases updated dynamically, and build robust AI assistants over enterprise documents, videos, and multi-format files.
        </div>
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
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{step.desc}</p>
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
                <li key={i} className="text-xs font-semibold text-slate-750 dark:text-slate-200 flex items-center gap-1.5 list-none">
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
            <p className="text-xs text-slate-650 dark:text-slate-300 mt-1 leading-relaxed">
              Curious Full Stack developer specializing in AI systems, vector similarity retrieval, and clean SaaS layout design. Built with micro-animations, Supadata transcript fetching, Xenova Transformers local embedding generation, and cosine similarity vector search.
            </p>

            <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">
              <a
                href="https://github.com/adarshmalviya79-stack"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 border border-slate-200 bg-white rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-650 hover:text-slate-900 hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-white dark:hover:border-slate-600 transition-all cursor-pointer"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub Portfolio</span>
              </a>
              <a
                href="https://www.linkedin.com/in/adarsh-malviya79"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 border border-slate-200 bg-white rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-650 hover:text-slate-900 hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-white dark:hover:border-slate-600 transition-all cursor-pointer"
              >
                <Linkedin className="h-3.5 w-3.5" />
                <span>LinkedIn Connect</span>
              </a>
              <a
                href="mailto:adarshmalviya79@gmail.com"
                className="flex items-center gap-1.5 border border-slate-200 bg-white rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-650 hover:text-slate-900 hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-white dark:hover:border-slate-600 transition-all cursor-pointer"
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
