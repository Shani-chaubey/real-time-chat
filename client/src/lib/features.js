const fileFormat = (url) =>{
    const fileExtension = url.split(".").pop();
    
    if(fileExtension === "png" || fileExtension === "jpg"|| fileExtension === "jpeg" || fileExtension === "gif" ){
        return "image";
    }
    if(fileExtension === "mp4" || fileExtension === "webm"|| fileExtension === "egg" ){
        return "video";
    }
    if(fileExtension === "mp3" || fileExtension === "wav" ){
        return "mp3";
    }
    
    return 'file'
}

const transformImage = ( url = "", width = 100 )=> (url)

export { fileFormat, transformImage }