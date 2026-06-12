# YouTube RAG Chatbot

An intelligent, interactive video query assistant that transforms YouTube videos into searchable knowledge structures. Users can load any video, view a detailed semantic summary, and ask questions through a chat interface to get answers backed by precise, clickable timeline source citations.

---

## 🛠️ Architecture & Technology Stack

The project operates using a modern, scalable Retrieval-Augmented Generation (RAG) pipeline:

### Frontend
- **React**: Component-driven UI development.
- **TypeScript**: Robust, type-safe development environment.
- **Vite**: Ultra-fast module bundler and hot reload system.
- **Tailwind CSS**: Utility-first styling with modern responsive grids.
- **Framer Motion**: Smooth interactive micro-animations.
- **Lucide Icons**: Consistent, clean iconography.

### Backend & Database
- **Node.js**: Asynchronous JavaScript runtime environment.
- **Express.js**: Lightweight framework managing backend endpoint routing.
- **MongoDB Atlas**: High-availability database hosting vector configurations and text chunks.

### RAG Pipeline & AI
- **Supadata**: Fast extraction of YouTube transcripts.
- **Xenova Transformers**: Local embedding generation engine.
- **all-MiniLM-L6-v2**: The semantic vector model used to encode transcript segments.
- **Cosine Similarity Search**: Performs high-performance vector retrieval to identify relevant segments.
- **OpenRouter & DeepSeek**: Renders grounded answers based strictly on retrieved video segments.

### Deployment
- **Render**: Reliable cloud hosting.

---

## 🚀 Local Development Setup

Follow these steps to run the interactive frontend client locally:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)

### Step-by-Step Guide

1. **Clone the Repository** and navigate to the root directory.

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Access the Application**:
   Open your browser and navigate to the address shown in your terminal (typically `http://localhost:5173`).

---

## 💡 How the RAG Pipeline Works

1. **Ingest**: Paste a YouTube link in the input card.
2. **Fetch**: The backend retrieves transcript chunks using Supadata.
3. **Embed**: Chunks are encoded into vectors using Xenova Transformers.
4. **Index**: Vector data is stored in MongoDB Atlas.
5. **Search**: When you ask a question, Cosine Similarity search matches your question to the most relevant transcript segments.
6. **Generate**: The system feeds the matches as facts to the DeepSeek model through OpenRouter, outputting citation-backed answers.
