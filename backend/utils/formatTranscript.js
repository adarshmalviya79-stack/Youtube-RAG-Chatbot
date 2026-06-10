function formatTanscript (transcript){
    return transcript
    .map(item => item.text)
    .join("");
}

module.exports = formatTanscript;