const mongoose = require("mongoose");

const chunkSchema = new mongoose.Schema({
    text:String,

    embedding : [Number],

    startTime : Number ,

    endTime : Number ,

    videoId : String,

    createdAt:{
   type:Date,
   default:Date.now,
   expires:86400
}


})

module.exports = mongoose.model("chunk",chunkSchema)