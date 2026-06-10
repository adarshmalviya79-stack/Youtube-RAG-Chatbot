const axios = require("axios");

async function getTranscript(videoId) {
  try {
    const response = await axios.get(
      `https://api.supadata.ai/v1/youtube/transcript?videoId=${videoId}`,
      {
        headers: {
          "x-api-key": process.env.SUPADATA_API_KEY,
        },
      }
    );

    return response.data.content;
  } catch (err) {
    console.log(
      "SUPADATA ERROR:",
      err.response?.data || err.message
    );

    throw err;
  }
}

module.exports = getTranscript;