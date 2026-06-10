const { GoogleGenerativeAI } = require("@google/generative-ai");

// Remember to use a newly generated API key since the last one was exposed!
const genAI = new GoogleGenerativeAI("AQ.Ab8RN6JZt-EFM1QZT3LUjoerbaWNJHcNKR3dD-JiD5fbHNNPuA");

async function test() {
  try {
    const model = genAI.getGenerativeModel({
      // CHANGED: Swapped the deprecated 1.5 model for a current version
      model: "gemini-2.5-flash" 
    });

    const result = await model.generateContent("What is RAG?");
    
    const response = await result.response;
    console.log(response.text());

  } catch (err) {
    console.error("Error executing Gemini:", err);
    
  }
}

test();