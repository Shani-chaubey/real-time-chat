import mongoose from "mongoose";
import jwt from "jsonwebtoken";

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

const emitEvent = (req,event,users,data)=>{
  console.log("event",event)
}


export { connectDB, sendToken, emitEvent };
