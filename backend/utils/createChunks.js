function createChunks(transcript,chunkSize=10){
    const chunks=[];

    for (let i=0; i<transcript.length; i+=chunkSize){
        const part = transcript.slice(i,i+chunkSize);

        chunks.push({
            text:part.map(item => item.text).join(""),
            startTime:part[0].offset,
            endTime:
            part[part.length-1].offset+
            part[part.length-1].duration,
        })
    }
    return chunks;
}

module.exports = createChunks;