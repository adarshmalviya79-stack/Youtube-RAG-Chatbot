import { useState } from "react";
import { useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Remarkgfm from "remark-gfm"; 


function App() {
  const [url, setUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState("");
  const API_URL = "https://youtube-rag-chatbot-fiaz.onrender.com";
  
 

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);

    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  function getVideoId(url) {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v");
  }

  async function loadVideo() {
    try {
      setVideoLoading(true);

      const videoId = getVideoId(url);
      setCurrentVideoId(videoId);

      await axios.get(`${API_URL}/store/${videoId}`);

      alert("Video Loaded Successfully");
    } catch (err) {
      console.log(err);
    } finally {
      setVideoLoading(false);
    }
  }

  async function getSummary() {
    try {
      setSummaryLoading(true);

      const videoId = getVideoId(url);

      const res = await axios.get(`${API_URL}/summary/${videoId}`);

      setSummary(res.data.summary);
    } catch (err) {
      console.log(err);
    } finally {
      setSummaryLoading(false);
    }
  }

  async function askQuestion() {
    try {
      setLoading(true);

      const res = await axios.get(`${API_URL}/ask`, {
        params: {
          question,
          videoId:currentVideoId
        },
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: question,
        },
        {
          role: "assistant",
          content: res.data.answer,
          sources: res.data.sources,
        },
      ]);
      console.log(res.data);
      console.log(res.data.sources);
    } catch (err) {
      console.log(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "DeepSeek is currently busy. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setQuestion("");
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">YouTube RAG Chatbot</h1>

      

        <p className="text-center text-gray-400 mt-2">
          Ask any YouTube video anything
        </p>

        {/* Video Controls */}
        <div className="mt-8 bg-slate-800 rounded-2xl p-5">
          <input
            type="text"
            placeholder="Paste YouTube URL" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 outline-none"
          />
          <button
            onClick={loadVideo}
            disabled={videoLoading}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transition p-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {videoLoading ? "Loading Video..." : "Load Video"}
          </button>

          <button
            onClick={getSummary}
            disabled={summaryLoading}
            className="w-full mt-3 bg-purple-600 hover:bg-purple-700 transition p-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {summaryLoading ? "Generating Summary..." : "Generate Summary"}
          </button>
        </div>

        {currentVideoId && (
          <img
            src={`https://img.youtube.com/vi/${currentVideoId}/maxresdefault.jpg`}
            alt="thumbnail"
            className="w-full rounded-xl mt-4 object-cover max-h-[400px]"
          />
        )}

        {/* Summary */}
        {summary && (
          <div className="mt-6 bg-slate-800 rounded-2xl p-4 sm:p-5">
            <h2 className="text-xl font-bold text-purple-400 mb-3">
              Video Summary
            </h2>

            <div className="prose prose-invert max-w-none break-words">
              <ReactMarkdown remarkPlugins={[Remarkgfm]}>
                {summary}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Chat Area */}
        <div className="mt-8">
          <div className="bg-slate-800 rounded-2xl p-5 min-h-[300px] sm:min-h-[400px] max-h-[65vh] overflow-y-auto">
            {messages.length === 0 && !loading && (
              <div className="text-center text-gray-500 mt-20">
                Ask a question to get started
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className="mb-4">
                {message.role === "user" ? (
                  <div className="flex justify-end">
                    <div className="bg-green-600 text-white p-4 rounded-2xl max-w-[92%] sm:max-w-[85%] md:max-w-[80%]">
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-start">
                    <div className="bg-slate-900 p-4 rounded-2xl max-w-[92%] sm:max-w-[85%] md:max-w-[80%]">
                      <div className="prose prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[Remarkgfm]}>
                          {message.content}
                        </ReactMarkdown>

                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(message.content)
                          }
                          className="mt-3 text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded"
                        >
                          📋 Copy
                        </button>
                      </div>

                      {message.sources?.length > 0 && (
                        <div className="mt-4">
                          <h3 className="text-yellow-400 text-sm mb-2">
                            Sources
                          </h3>

                          <p className="text-xs text-gray-400 mb-2">
                            Click a timestamp to jump to that part of the video.
                          </p>

                          <div className="space-y-2">
                            {message.sources.map((source, i) => (
                              <a
                                key={i}
                                href={`https://youtube.com/watch?v=${currentVideoId}&t=${Math.floor(
                                  source.startTime / 1000,
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="block bg-slate-800 hover:bg-slate-700 p-3 rounded-lg text-blue-400 transition"
                              >
                                ▶ {formatTime(source.startTime)}
                                {" - "}
                                {formatTime(source.endTime)}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-900 p-4 rounded-2xl">
                  <div className="animate-pulse">Thinking...</div>
                </div>
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>
        </div>

        {/* Question Input */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                askQuestion();
              }
            }}
            className="flex-1 p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none"
          />

          <button
            onClick={askQuestion}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 transition px-8 py-4 rounded-xl font-semibold disabled:opacity-50 "
          >
            {loading ? "Thinking..." : "Ask"}
          </button>

          <button
            onClick={() => setMessages([])}
            className="bg-red-600 hover:bg-red-700 transition px-8 py-4 rounded-xl font-semibold"
          >
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
