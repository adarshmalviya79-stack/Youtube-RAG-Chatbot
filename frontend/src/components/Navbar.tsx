import { useState } from "react";
import { Youtube, Moon, Sun, Menu, X, Github, Linkedin, Mail, Info } from "lucide-react";

interface NavbarProps {
  currentView: "home" | "about";
  onNavigate: (view: "home" | "about") => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({ currentView, onNavigate, darkMode, onToggleTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/75 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/75 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and App Name */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate("home")}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20 hover:scale-105 transition-transform duration-200">
              <Youtube className="h-5 w-5 fill-current" />
            </div>
            <span className="font-sans text-lg font-bold tracking-tight text-slate-800 dark:text-white sm:text-xl">
              YouTube <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent italic">RAG Chatbot</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate("home")}
              className={`text-sm font-medium transition-colors ${
                currentView === "home"
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate("about")}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                currentView === "about"
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              }`}
            >
              <Info className="h-4 w-4" /> About RAG
            </button>

            {/* Divider */}
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/adarshmalviya79-stack"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-all"
                title="GitHub"
              >
                <Github className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/adarsh-malviya79"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-all"
                title="LinkedIn"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a
                href="mailto:adarshmalviya79@gmail.com"
                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-all"
                title="Email Developer"
              >
                <Mail className="h-4.5 w-4.5" />
              </a>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition-all cursor-pointer"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="h-4.5 w-4.5 text-yellow-400" /> : <Moon className="h-4.5 w-4.5" />}
            </button>
          </div>

          {/* Mobile Right Controls (Hamburger & Theme) */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onToggleTheme}
              className="rounded-xl border border-slate-200 p-2 text-slate-600 dark:border-slate-800 dark:text-slate-300 transition-all cursor-pointer"
            >
              {darkMode ? <Sun className="h-4.5 w-4.5 text-yellow-400" /> : <Moon className="h-4.5 w-4.5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl border border-slate-200 p-2 text-slate-600 dark:border-slate-800 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900 md:hidden animate-fade-in transition-colors duration-300">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                onNavigate("home");
                setMobileMenuOpen(false);
              }}
              className={`flex items-center w-full px-4 py-2.5 rounded-xl text-left text-sm font-medium transition-colors ${
                currentView === "home"
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              Home View
            </button>
            <button
              onClick={() => {
                onNavigate("about");
                setMobileMenuOpen(false);
              }}
              className={`flex items-center w-full px-4 py-2.5 rounded-xl text-left text-sm font-medium transition-colors ${
                currentView === "about"
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              <Info className="mr-2 h-4 w-4" /> About RAG Architecture
            </button>

            <div className="h-px bg-slate-200 dark:bg-slate-800 my-1" />

            <div className="flex items-center justify-around py-2">
              <a
                href="https://github.com/adarshmalviya79-stack"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/adarsh-malviya79"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href="mailto:adarshmalviya79@gmail.com"
                className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
