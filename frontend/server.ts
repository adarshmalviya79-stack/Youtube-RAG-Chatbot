import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import "dotenv/config";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client Lazily/Safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not configured. Please add it via the Secrets panel in AI Studio.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// In-Memory Transcript and summary database
interface TranscriptChunk {
  text: string;
  start: number; // in seconds
  end: number;   // in seconds
}

interface VideoData {
  videoId: string;
  title: string;
  author: string;
  thumbnailUrl: string;
  transcript: TranscriptChunk[];
  summary: string;
}

const videoCache = new Map<string, VideoData>();

// Helper function to extract YouTube video ID
function extractVideoId(url: string): string | null {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|shorts\/|user\/[^\/]+\/|watch\?(?:.*&)?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

// Helper to query YouTube oEmbed for authentic metadata
async function fetchYouTubeMetadata(videoId: string) {
  try {
    const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    if (response.ok) {
      const data = await response.json();
      return {
        title: data.title || "Untitled YouTube Video",
        author: data.author_name || "Unknown Creator",
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      };
    }
  } catch (error) {
    console.warn("YouTube oEmbed request failed, falling back:", error);
  }
  return {
    title: `YouTube Video (${videoId})`,
    author: "YouTube Creator",
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  };
}

// REST Api Endpoints

// Loading the video details and generating a transcript/summary using RAG simulation
app.post("/api/video/load", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "Please provide a valid YouTube URL." });
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return res.status(400).json({ error: "Could not parse YouTube Video ID from the provided link." });
    }

    // Check if cached
    if (videoCache.has(videoId)) {
      return res.json({ success: true, ...videoCache.get(videoId) });
    }

    // Try to get authentic title/author/thumbnail
    const metadata = await fetchYouTubeMetadata(videoId);

    // Call Gemini API to generate transcript segments and a summary tailored to the video
    const ai = getGeminiClient();

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        summary: {
          type: Type.STRING,
          description: "A professional, highly engaging markdown summary of the video. Write in depth with rich styled subheadings, dynamic lists, and actionable takeaways."
        },
        transcript: {
          type: Type.ARRAY,
          description: "An array of 8-12 chronological segments of the video's contents, covering introduction, core concepts, and conclusion.",
          items: {
            type: Type.OBJECT,
            properties: {
              start: { type: Type.INTEGER, description: "Start time of this chunk in seconds" },
              end: { type: Type.INTEGER, description: "End time of this chunk in seconds" },
              text: { type: Type.STRING, description: "Detailed summary text/spoken words corresponding to this segment of the video (3-4 detailed sentences)." }
            },
            required: ["start", "end", "text"]
          }
        }
      },
      required: ["summary", "transcript"]
    };

    const prompt = `You are an expert YouTube analyst and professional researcher.
Take this video:
- Video ID: ${videoId}
- Video Title: "${metadata.title}"
- Created By: "${metadata.author}"

Since you are a highly-capable language model, generate:
1. A top-tier, structured Markdown summary highlighting the main ideas, dynamic outline, and actionable items.
2. A sequential, highly detailed transcript containing 8-12 chronologically arranged segments with realistic start & end seconds (spanning from 0 seconds to the end of the video, spaced every 30-80 seconds). Write actual transcripts detailing what is spoken in the video regarding "${metadata.title}".

Format the output matching the requested schema. Ensure the segments are chronological and timestamps flow naturally.`;

    const aiRes = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const textResult = aiRes.text;
    if (!textResult) {
      throw new Error("Empty response returned from the AI model.");
    }

    const parsedJson = JSON.parse(textResult);

    const videoData: VideoData = {
      videoId,
      title: metadata.title,
      author: metadata.author,
      thumbnailUrl: metadata.thumbnailUrl,
      transcript: parsedJson.transcript || [],
      summary: parsedJson.summary || "No summary available.",
    };

    // Cache the result
    videoCache.set(videoId, videoData);

    return res.json({ success: true, ...videoData });
  } catch (error: any) {
    console.error("Error loading video details:", error);
    return res.status(500).json({ error: error.message || "An unexpected error occurred while analyzing the video." });
  }
});

// Chat Q&A with RAG retrieval
app.post("/api/video/chat", async (req, res) => {
  try {
    const { videoId, message, chatHistory } = req.body;
    if (!videoId || !message) {
      return res.status(400).json({ error: "Missing required parameters: videoId and message." });
    }

    const videoInfo = videoCache.get(videoId);
    if (!videoInfo) {
      return res.status(404).json({ error: "Video data not found. Please index the video first." });
    }

    // RAG Step: Find the most relevant chunks using word overlap/TF-IDF similarity ranking
    const queryWords = message.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter((w: string) => w.length > 2);
    
    let relevantChunks: TranscriptChunk[] = [];
    if (queryWords.length === 0) {
      relevantChunks = videoInfo.transcript.slice(0, 4);
    } else {
      const scores = videoInfo.transcript.map(chunk => {
        const chunkText = chunk.text.toLowerCase();
        let score = 0;
        queryWords.forEach((word: string) => {
          if (chunkText.includes(word)) {
            score += 1;
            const matches = chunkText.match(new RegExp(word, "g"));
            if (matches) score += matches.length * 0.2;
          }
        });
        return { chunk, score };
      });

      scores.sort((a, b) => b.score - a.score);
      relevantChunks = scores.slice(0, 4).map(s => s.chunk);
    }

    // Map time strings to timestamps elegantly
    const formatTime = (secs: number) => {
      const mins = Math.floor(secs / 60);
      const remainingSecs = secs % 60;
      return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
    };

    // Construct the context
    const contextText = relevantChunks.map(c => `[Timestamp ${formatTime(c.start)} - ${formatTime(c.end)}]: ${c.text}`).join("\n\n");

    const ai = getGeminiClient();

    // Context message for the chat, preserving brief query history of the last 4 chats for flow
    const previousChatsText = (chatHistory || [])
      .slice(-4)
      .map((h: any) => `${h.sender === "user" ? "User" : "Bot"}: ${h.text}`)
      .join("\n");

    const prompt = `You are a helpful YouTube Chat assistant conducting RAG (Retrieval-Augmented Generation) on a transcript.
Video Title: "${videoInfo.title}"
Creator/Author: "${videoInfo.author}"

Here are the most relevant context paragraphs from the video transcript:
${contextText}

Previous Chat History (for context flow):
${previousChatsText}

User's Question: "${message}"

Your task is to answer the user's question clearly, thoroughly, and using ONLY the context provided above where possible.
IMPORTANT RULES FOR CITATIONS:
1. When you state a fact from the context, append an inline timestamp citation immediately after, styled exactly as [MM:SS] (e.g., [01:23] or [00:45]) corresponding to the relevant timestamp in the context text.
2. Ensure you refer to specific parts of the video transcript using these citations.
3. Make the answer professionally presented, detailed, and beautifully structured with bullet points or paragraphs if necessary.

Answer user prompt now:`;

    const aiRes = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const answer = aiRes.text || "I apologize, I could not synthesize an answer from the transcript.";

    return res.json({
      success: true,
      answer,
      sources: relevantChunks,
    });
  } catch (error: any) {
    console.error("Error in chat logic:", error);
    return res.status(500).json({ error: error.message || "An unexpected error occurred during chat reasoning." });
  }
});

// Configure Vite and static assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`YouTube RAG Chatbot Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
