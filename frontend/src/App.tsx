import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VideoLoaderCard from "./components/VideoLoaderCard";
import VideoPreviewCard from "./components/VideoPreviewCard";
import SummaryCard from "./components/SummaryCard";
import ChatContainer from "./components/ChatContainer";
import ChatInput from "./components/ChatInput";
import Footer from "./components/Footer";
import AboutPage from "./components/AboutPage";
import { Message, VideoData } from "./types";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, HelpCircle, CheckCircle2, ShieldAlert, AlertTriangle } from "lucide-react";

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "about">("home");
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("darkMode");
    return saved !== null ? saved === "true" : true;
  });
  
  // App core states
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [isIndexing, setIsIndexing] = useState<boolean>(false);
  const [isSummarizing, setIsSummarizing] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isSummaryHighlighted, setIsSummaryHighlighted] = useState<boolean>(false);

  const summaryRef = useRef<HTMLDivElement | null>(null);

  // Chat states
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingChat, setIsLoadingChat] = useState<boolean>(false);
  
  // Media seeking state
  const [activeTimestamp, setActiveTimestamp] = useState<number | null>(null);

  // Floating Toast Notifications state
  const [toast, setToast] = useState<{ text: string; type: "success" | "info" | "error" } | null>(null);

  // Sync dark class on document element and body
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      root.classList.remove("dark");
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  const showToast = (text: string, type: "success" | "info" | "error" = "success") => {
    setToast({ text, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Seek video control
  const handleSeek = (seconds: number) => {
    setActiveTimestamp(seconds);
    const formattedMinutes = Math.floor(seconds / 60);
    const formattedSeconds = seconds % 60;
    const timeStr = `${formattedMinutes.toString().padStart(2, "0")}:${formattedSeconds.toString().padStart(2, "0")}`;
    showToast(`Streaming playback seeking to [${timeStr}]`, "info");
  };

  function extractVideoId(url: string): string | null {
    if (!url) return null;
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|shorts\/|user\/[^\/]+\/|watch\?(?:.*&)?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  // Endpoint communicator: Load and index YouTube video
  const handleLoadVideo = async (url: string) => {
    setIsIndexing(true);
    setVideoError(null);
    // Clear previous video context and chats
    setVideoData(null);
    setMessages([]);
    setActiveTimestamp(null);

    const videoId = extractVideoId(url);
    if (!videoId) {
      setVideoError("Could not parse YouTube Video ID from the provided link. Please enter a valid YouTube URL.");
      setIsIndexing(false);
      showToast("Invalid YouTube URL", "error");
      return;
    }

    try {
      // Fetch YouTube metadata directly via oEmbed since local backend is bypassed
      let title = `YouTube Video (${videoId})`;
      let author = "YouTube Creator";
      let thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      
      try {
        const oEmbedRes = await axios.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
        if (oEmbedRes.data) {
          title = oEmbedRes.data.title || title;
          author = oEmbedRes.data.author_name || author;
        }
      } catch (error) {
        console.warn("YouTube oEmbed fetch failed, using default metadata:", error);
        thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }

      // Call external backend store endpoint to process/index video
      await axios.get(`https://youtube-rag-chatbot-fiaz.onrender.com/store/${videoId}`);

      const loadedVideo: VideoData = {
        videoId,
        title,
        author,
        thumbnailUrl,
        transcript: [], // Managed server-side in the external backend
        summary: "" // Summary is empty until explicitly requested
      };

      setVideoData(loadedVideo);
      showToast(`Video indexed successfully! RAG ready.`, "success");

      // Initial system welcoming message
      setMessages([
        {
          id: "welcome-message",
          sender: "assistant",
          text: `Hi! I have successfully loaded and completed the RAG (Retrieval-Augmented Generation) indexing for this video.\n\nFeel free to ask me anything about the content of this video! You can click any timestamp citation in my responses, or use the recommended suggestions to start.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          sources: []
        }
      ]);
    } catch (err: any) {
      console.error(err);
      const errorMsg = err.response?.data?.error || err.message || "An unexpected error occurred during indexing.";
      setVideoError(errorMsg);
      showToast(errorMsg, "error");
    } finally {
      setIsIndexing(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (!videoData) return;
    setIsSummarizing(true);
    try {
      showToast("Generating summary...", "info");
      const summaryRes = await axios.get(`https://youtube-rag-chatbot-fiaz.onrender.com/summary/${videoData.videoId}`);
      if (summaryRes.status !== 200 || !summaryRes.data) {
        throw new Error("Failed to retrieve summary from the backend.");
      }
      
      const summaryText = summaryRes.data.summary || "No summary available.";
      setVideoData((prev) => prev ? { ...prev, summary: summaryText } : null);
      showToast("Summary generated successfully!", "success");

      // Auto Scroll and Highlight summary section
      setTimeout(() => {
        summaryRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
        setIsSummaryHighlighted(true);
        setTimeout(() => {
          setIsSummaryHighlighted(false);
        }, 1500);
      }, 100);
    } catch (err: any) {
      console.error(err);
      const errorMsg = err.response?.data?.error || err.message || "Failed to generate summary.";
      showToast(errorMsg, "error");
    } finally {
      setIsSummarizing(false);
    }
  };

  // Endpoint communicator: Send chat message and retrieve citation backing context content
  const handleSendMessage = async (text: string) => {
    if (!videoData) return;

    // Append user message immediately
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const chatHistory = messages.map(m => ({
      sender: m.sender,
      text: m.text
    }));

    setMessages((prev) => [...prev, userMsg]);
    setIsLoadingChat(true);

    try {
      // Call external backend ask endpoint with question and videoId as query parameters
      const response = await axios.get("https://youtube-rag-chatbot-fiaz.onrender.com/ask", {
        params: {
          question: text,
          videoId: videoData.videoId
        }
      });

      const data = response.data;

      // Map backend sources to match UI expectations (converting ms to seconds and providing default text if missing)
      const mappedSources = (data.sources || []).map((s: any) => {
        const start = s.startTime !== undefined ? s.startTime / 1000 : (s.start ?? 0);
        const end = s.endTime !== undefined ? s.endTime / 1000 : (s.end ?? 0);
        return {
          start,
          end,
          text: s.text || `Segment [${Math.floor(start)}s - ${Math.floor(end)}s]`
        };
      });

      // Append chatbot answer response
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: data.answer || "I apologize, I could not synthesize an answer from the transcript.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sources: mappedSources,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg = err.response?.data?.error || err.message || "Failed to fetch response.";
      showToast(errorMsg, "error");
      
      // Append localized error msg
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "assistant",
          text: `⚠️ **RAG System Error:** I couldn't compute standard vector embeddings or generate content. ${errorMsg}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
      ]);
    } finally {
      setIsLoadingChat(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    showToast("Chat history initialized.", "info");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 font-sans antialiased transition-colors duration-300">
      
      {/* Dynamic Ambient Blur Background elements */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-indigo-500/5 to-transparent blur-3xl dark:from-indigo-500/2" />

      {/* Navigation Layer */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Render RAG Architecture Explain View */}
        {currentView === "about" ? (
          <AboutPage />
        ) : (
          <div className="space-y-8">
            
            {/* Hero Layer */}
            <Hero />

            {/* Main Interactive Grid Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT Workspace Column: Video detail card, Embedded player, and Markdown Summary Card */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Loader Input section */}
                <VideoLoaderCard
                  onLoadVideo={handleLoadVideo}
                  onGenerateSummary={handleGenerateSummary}
                  isIndexing={isIndexing}
                  isSummarizing={isSummarizing}
                  isIndexed={videoData !== null}
                  error={videoError}
                />

                {/* Video detailed metadata/Index badges */}
                {videoData && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Embedded interactive player */}
                    <VideoPreviewCard
                      videoId={videoData.videoId}
                      title={videoData.title}
                      author={videoData.author}
                      thumbnailUrl={videoData.thumbnailUrl}
                      activeTimestamp={activeTimestamp}
                    />

                    {/* Expandable summary overview */}
                    {/* Expandable summary overview with dynamic scroll target and highlight glow */}
                    <div
                      ref={summaryRef}
                      className={`transition-all duration-500 rounded-2xl ${
                        isSummaryHighlighted
                          ? "ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-950 shadow-[0_0_15px_rgba(99,102,241,0.5)] dark:shadow-[0_0_20px_rgba(99,102,241,0.3)] scale-[1.01]"
                          : "ring-transparent shadow-none scale-100"
                      }`}
                    >
                      <SummaryCard
                        summary={videoData.summary}
                        onSeek={handleSeek}
                        videoId={videoData.videoId}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Simple guide if video isn't loaded */}
                {!videoData && !isIndexing && (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-white/40 p-6 text-center dark:border-slate-800/80 dark:bg-slate-900/10">
                    <HelpCircle className="mx-auto h-8 w-8 text-slate-400 dark:text-slate-500 animate-pulse" />
                    <h4 className="mt-2 text-xs font-bold text-slate-700 dark:text-slate-300">No active video loaded</h4>
                    <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500 max-w-xs mx-auto">
                      Submit a video link above. We will fetch technical details, cache indexes, and prepare the RAG database.
                    </p>
                  </div>
                )}
              </div>

              {/* RIGHT Workspace Column: Real-time chatbot Dialogue and Citation input field */}
              <div className="lg:col-span-7 space-y-4">
                <ChatContainer
                  messages={messages}
                  onSeek={handleSeek}
                  onClearChat={handleClearChat}
                  isLoading={isLoadingChat}
                  onSuggestedClick={handleSendMessage}
                  videoId={videoData?.videoId}
                />
                
                <ChatInput
                  onSendMessage={handleSendMessage}
                  isLoading={isLoadingChat}
                  disabled={!videoData}
                />
              </div>

            </div>
          </div>
        )}
      </main>

      {/* Floating System-Wide Toast Alert Notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-slate-900 px-4.5 py-3.5 shadow-2xl text-white dark:bg-white dark:text-slate-900 border border-slate-800/85 dark:border-slate-200 max-w-sm"
          >
            {toast.type === "success" && <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />}
            {toast.type === "error" && <ShieldAlert className="h-5 w-5 text-red-400 shrink-0" />}
            {toast.type === "info" && <Sparkles className="h-5 w-5 text-indigo-500 dark:text-indigo-400 shrink-0" />}
            <span className="text-xs font-semibold leading-snug">{toast.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shared Footer block */}
      <Footer />
    </div>
  );
}
