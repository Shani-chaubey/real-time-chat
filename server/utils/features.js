import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { getBase64 } from "../lib/helper.js";

const connectDB = (uri) => {
  mongoose
    .connect(
      uri,
      { dbName: "realTimeChat" },
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then((data) =>
      console.log(`MongoDB Connected at Port  : ${data.connection.host}`)
    );
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res
    .status(code)
    .cookie("chat-token", token, { httpOnly: true, secure: true })
    .json({
      success: true,
      message,
      user,
    });
};

const emitEvent = (req, event, users, data) => {
  console.log("event", event);
};

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

const deletFilesFromCloudinary = async (cloudinary_id) => {};

export {
  connectDB,
  sendToken,
  emitEvent,
  deletFilesFromCloudinary,
  uploadFilesToCloudinary,
};
