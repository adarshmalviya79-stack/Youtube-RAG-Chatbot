const axios = require("axios");

async function generateAnswer(context, question) {
  const prompt = `
You are a helpful AI assistant.

Use the provided context to answer the question.

If the answer is partially available,
provide the best possible answer.

Only say "Information not found"
if absolutely no relevant information exists.

You are an expert AI tutor.

Answer in a clean and structured format.

Use:
- Headings
- Bullet points
- Short paragraphs

If applicable include:
1. Definition
2. Explanation
3. Key points
4. Examples

Context:
${context}

Question:
${question}

Answer:
`;

  try {
    console.log(
      "OPENROUTER KEY EXISTS:",
      !!process.env.OPENROUTER_API_KEY
    );

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat-v3-0324",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;

  } catch (err) {
    console.log(
      "OPENROUTER ERROR:",
      JSON.stringify(err.response?.data, null, 2)
    );

    throw err;
  }
}

module.exports = generateAnswer;