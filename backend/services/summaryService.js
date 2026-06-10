const axios = require("axios");

async function generateSummary(transcript) {

    const prompt = `
You are an expert summarizer.

Analyze the following YouTube transcript and provide:

# Video Summary

## Main Topic

## Key Points
- Point 1
- Point 2
- Point 3

## Important Concepts

## Final Takeaway

Transcript:

${transcript}
`;

    const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            model: "deepseek/deepseek-chat-v3-0324",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            }
        }
    );

    return response.data.choices[0].message.content;
}

module.exports = generateSummary;