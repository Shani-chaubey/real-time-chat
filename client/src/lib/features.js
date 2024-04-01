const fileFormat = (url) =>{
    const fileExtension = url.split(".").pop();
    if(fileExtension === "mp4" || fileExtension === "webm"|| fileExtension === "egg" ){
        return "video";
    }
    if(fileExtension === "mp3" || fileExtension === "wav" ){
        return "mp3";
    }
    if(fileExtension === "png" || fileExtension === "jpg"|| fileExtension === "jpeg" || fileExtension === "gif" ){
        return "image";
    }
    return 'file'
}

export { fileFormat }