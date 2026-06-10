

async function chunkTranscript(text){
    const splitter = new RecursiveChunkTextSplitter({
        chunkSize:1000,
        chunkOverlap:200,
    })

    const chunks = await splitter.createDocument([text]);

    return chunks;
}

module.exports = chunkTranscript;