import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
import cors from 'cors'
import cloudinary from 'cloudinary'

import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRoute from "./routes/user.routes.js";
import chatRoute from "./routes/chat.routes.js";
import adminRoute from "./routes/admin.routes.js";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.model.js";

dotenv.config();

const MongoURI = process.env.MONGODB;
const port = process.env.PORT;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const userSocketIDs = new Map();

connectDB(MongoURI);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();
const server = createServer(app);
const io = new Server(server, {});

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173', process.env.CLIENT_URL], credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoute);
app.use("/api/v1//chat", chatRoute);
app.use("/api/v1//admin", adminRoute);

io.use((socket, next) => {});

io.on("connection", (socket) => {
  const user = {
    _id: "10101998",
    name: "Himanshu",
  };
  userSocketIDs.set(user._id.toString(), socket.id.toString());
  console.log(userSocketIDs);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };
    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };
    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });
    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

    await Message.create(messageForDB);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
    userSocketIDs.delete(user._id.toString());
  });
});

app.use(errorMiddleware);

server.listen(port, () => {
  console.log(
    `Server is running on port : ${port} in ${process.env.NODE_ENV} Mode`
  );
});

export { envMode, userSocketIDs };

