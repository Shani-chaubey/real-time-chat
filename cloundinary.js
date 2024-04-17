cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFilesToCloudinary = async (files) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  });

  const results = await Promise.all(uploadPromises);
  const formattedResult = results.map((result) => {
    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  });
  return formattedResult;
};
