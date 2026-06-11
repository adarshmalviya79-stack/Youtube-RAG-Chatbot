import { Youtube, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-150 py-8 bg-slate-50/50 dark:bg-slate-950/20 dark:border-slate-850/85 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400 dark:text-slate-500">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Youtube className="h-4 w-4 text-indigo-500" />
            <span className="font-bold text-slate-650 dark:text-slate-400">
              YouTube RAG Chatbot Redesign
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-indigo-500 fill-indigo-500" />
            <span>by</span>
            <a
              href="https://linkedin.com/in/adarsh-malviya"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-slate-650 hover:text-indigo-650 dark:text-slate-400 dark:hover:text-indigo-450 transition-colors"
            >
              Adarsh Malviya
            </a>
          </div>

          <div>
            <span>© 2026 YouTube RAG Chatbot. Open source MIT.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
