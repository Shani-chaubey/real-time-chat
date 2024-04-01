import React from 'react'

const RenderAttachment = (file, url) => {
    switch(file){
        case 'image': 
            <img src={url} alt='' />
            break
        case 'video': 
            <video url={url} preload='none' width={'200px'} controls />
            break
        case 'video': 
            <audio url={url} preload='none' width={'200px'} controls />
            break
        default:
            break
    }
}

export default RenderAttachment