function About() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-400 mb-6">
          About TubeInsight AI
        </h1>

        <p className="text-gray-300 leading-8">
          TubeInsight AI is a Retrieval-Augmented Generation
          (RAG) powered application that allows users to chat
          with YouTube videos, generate summaries and get
          context-aware answers from video transcripts.
        </p>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">
          How It Works
        </h2>

        <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-300">
          <li>Extract YouTube Transcript</li>
          <li>Create Chunks</li>
          <li>Generate Embeddings</li>
          <li>Store Data in MongoDB</li>
          <li>Retrieve Relevant Context</li>
          <li>Generate Answers using DeepSeek</li>
        </ul>

        <h2 className="text-2xl font-semibold text-purple-400 mt-8">
          Tech Stack
        </h2>

        <div className="flex flex-wrap gap-3 mt-4">

          <span className="bg-slate-800 px-3 py-2 rounded-lg">
            React
          </span>

          <span className="bg-slate-800 px-3 py-2 rounded-lg">
            Node.js
          </span>

          <span className="bg-slate-800 px-3 py-2 rounded-lg">
            Express
          </span>

          <span className="bg-slate-800 px-3 py-2 rounded-lg">
            MongoDB
          </span>

          <span className="bg-slate-800 px-3 py-2 rounded-lg">
            DeepSeek
          </span>

          <span className="bg-slate-800 px-3 py-2 rounded-lg">
            RAG
          </span>

        </div>

        <h2 className="text-2xl font-semibold text-yellow-400 mt-8">
          Developer
        </h2>

        <p className="mt-2 text-gray-300">
          Preetam Raghuvanshi
        </p>

        <div className="flex gap-4 mt-4">

          <a
            href="YOUR_GITHUB_LINK"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:underline"
          >
            GitHub
          </a>

          <a
            href="YOUR_LINKEDIN_LINK"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:underline"
          >
            LinkedIn
          </a>

        </div>

      </div>

    </div>
  );
}

export default About;