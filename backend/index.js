const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const getTranscript = require("./services/transcriptService");
const formatTranscript = require("./utils/formatTranscript");
const createChunks = require("./utils/createChunks");
const getEmbedding = require("./services/localEmbeddingService");
const vectorStore = require("./data/vectorStore");
const cosineSimilarity = require("./utils/cosineSimilarity");
const Chunk = require("./models/Chunk.js");
const generateContent = require("./services/llmService.js");
const generateSummary = require("./services/summaryService.js");

const app = express();

app.use(cors());
app.use(express.json());

console.log("Mongo URI exists:", !!process.env.MONGO_URI);
console.log("DeepSeek key exists:", !!process.env.DEEPSEEK_API_KEY);

app.get("/summary/:videoId",async(req,res)=>{
    try{
        const chunks = await Chunk.find({
            videoId:req.params.videoId
        })

        const transcript = chunks
        .map(chunk => chunk.text)
        .join("/n");

        const summary = await generateSummary(transcript);
        
        res.json({
            summary
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

app.get("/ask", async (req, res) => {
  try {
    const question = req.query.question;

    const queryEmbedding = await getEmbedding(question);

    const chunks = await Chunk.find({
  videoId: req.query.videoId
});

    const results = chunks.map((item) => ({
      ...item.toObject(),

      score: cosineSimilarity(queryEmbedding, item.embedding),
    }));

    results.sort((a, b) => b.score - a.score);

    const topChunks = [];
    const seen = new Set();

    for (const chunk of results) {
      if (!seen.has(chunk.text)) {
        seen.add(chunk.text);
        topChunks.push(chunk);
      }

      if (topChunks.length === 3) {
        break;
      }
    }

    const context = topChunks.map((chunk) => chunk.text).join("\n\n");

    const answer = await generateContent(context, question);

    res.json({
      question,
      answer,
      sources: topChunks.map((chunk) => ({
        startTime: chunk.startTime,
        endTime: chunk.endTime,
      })),
    });
  } catch (err) {
  console.log("FULL ERROR:");

  console.log(err.response?.data);

  res.status(500).json({
    message: err.response?.data || err.message
  });
}
});

app.get("/store/:id", async (req, res) => {
  try {

    // CHECK FIRST
    const existing = await Chunk.findOne({
      videoId: req.params.id
    });

    if (existing) {
      return res.json({
        message: "Video already indexed"
      });
    }

    const transcript = await getTranscript(req.params.id);

    const chunks = createChunks(transcript);

    for(let i = 0; i < chunks.length; i++) {

      const embedding = await getEmbedding(chunks[i].text);

      await Chunk.create({
        videoId: req.params.id,
        text: chunks[i].text,
        embedding,
        startTime: chunks[i].startTime,
        endTime: chunks[i].endTime
      });
    }

    res.json({
      message: "Stored Successfully"
    });

  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});
app.get("/search", async (req, res) => {
  try {
    const question = req.query.question;

    if (!question) {
      return res.status(400).json({
        message: "Question is required",
      });
    }

    const queryEmbedding = await getEmbedding(question);

    const chunks = await Chunk.find();

    const results = chunks.map((item) => ({
      ...item.toObject(),

      score: cosineSimilarity(queryEmbedding, item.embedding),
    }));

    results.sort((a, b) => b.score - a.score);

    res.json(results.slice(0, 3));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.get("/transcript/:id", async (req, res) => {
  try {
    const transcript = await getTranscript(req.params.id);

    const chunks = createChunks(transcript);

    res.json(chunks);

    // const fullText = formatTranscript(transcript);

    // res.json({
    //     text:fullText
    // })
  } catch (err) {
    console.log(err);
  }
});

app.get("/", (req, res) => {
  res.send("backend running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log("Server running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
