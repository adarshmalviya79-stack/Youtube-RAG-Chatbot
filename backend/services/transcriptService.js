const {YoutubeTranscript} = require("youtube-transcript");

async function getTranscript(videoId){
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    return transcript;
}

module.exports = getTranscript;