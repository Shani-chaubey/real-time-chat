import multer from "multer";

export const multerUpload = multer({
    limits: {
        fileSize: 10000000 // 10MB
    }
})

export const attachmentsMulter = multerUpload.array('files', 10); // 10 files