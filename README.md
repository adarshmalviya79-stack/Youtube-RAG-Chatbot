# Youtube RAG Chatbot🎥🤖

TubeInsight AI is a Retrieval-Augmented Generation (RAG) powered application that enables users to interact with YouTube videos through natural language conversations.

Instead of manually searching through lengthy videos, users can load a YouTube video, generate an AI-powered summary, ask questions about the content, and receive context-aware answers backed by relevant transcript segments.

## Features

* 🎥 Load and analyze any YouTube video
* 📝 AI-generated video summaries
* 💬 Chat with video content using natural language
* 🔍 Semantic search using embeddings
* 📚 Retrieval-Augmented Generation (RAG)
* ⏱ Clickable timestamps linked to exact video moments
* 📋 Copy answers instantly
* 📱 Fully responsive design for desktop and mobile devices
* 🗄 MongoDB-powered transcript storage
* 🤖 DeepSeek-powered answer generation

## Tech Stack

### Frontend

* React
* Tailwind CSS
* Axios
* React Markdown

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### AI & RAG

* Embeddings
* Semantic Search
* Retrieval-Augmented Generation (RAG)
* DeepSeek LLM

## How It Works

1. Extract transcript from a YouTube video.
2. Split transcript into smaller chunks.
3. Generate embeddings for each chunk.
4. Store chunks and embeddings in MongoDB.
5. Convert user questions into embeddings.
6. Retrieve the most relevant transcript chunks using semantic similarity.
7. Provide context to DeepSeek.
8. Generate accurate, context-aware answers with source citations.

## Future Improvements

* Multi-video knowledge base
* Conversation memory
* Authentication system
* Video history tracking
* Advanced vector database integration
* Deployment with CI/CD

## Developer

**Adarsh Malviya**

B.Tech Student | Full Stack Developer | AI Enthusiast

If you found this project interesting, feel free to star the repository and connect with me.
