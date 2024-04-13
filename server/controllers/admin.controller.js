import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { ErrorHandler } from "../middlewares/utility.js";
import jwt from 'jsonwebtoken'

export const adminLogin = TryCatch(async (req, res, next) => {
    const { secretKey} = req.body;

    if (secretKey !== process.env.ADMIN_SECRETKEY) {
        return next(new ErrorHandler("Invalid secret key", 401));
    }

    const token = jwt.sign({ secretKey }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    })

    return res.status(200)
    .cookie('admin_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: true,
    })
    .json({
        success: true,
        message: "Welcome BOSS!",
    });
})

export const adminLogout = TryCatch(async (req, res, next) => {
    res
    .cookie("admin_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
})

export const allUsers = TryCatch(async (req, res) => {
  const users = await User.find();

  const transformData = await Promise.all(
    users.map(async ({ _id, name, username, avatar }) => {
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ groupChat: true, members: _id }),
        Chat.countDocuments({ groupChat: false, members: _id }),
      ]);

      return {
        _id,
        name,
        username,
        avatar: avatar.url,
        groups,
        friends,
      };
    })
  );

  res.status(200).json({
    success: true,
    users: transformData,
  });
});

export const allChats = TryCatch(async (req, res) => {
  const chats = await Chat.find().populate("members", "name avatar");

  const transformedChats = await Promise.all(
    chats.map(async ({ _id, groupChat, members, name, creator }) => {
      const transformedMembers = await Promise.all(
        members.map(async ({ _id, name, avatar }) => {
          return {
            _id,
            name,
            avatar: avatar.url,
          };
        })
      );
      const totalMessages = await Message.countDocuments({ chat: _id });
      const creatorDetails = await User.findById(creator);
      return {
        _id,
        groupChat,
        members: transformedMembers,
        name,
        avatar: members.slice(0, 3).map((member) => member.avatar.url),
        creator: {
          name: creatorDetails?.name || "None",
          avatar:
            creatorDetails?.avatar.url || "https://i.ibb.co/vJr2Y2/avatar.png",
        },
        totalMembers: members.length,
        totalMessages,
      };
    })
  );

  res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

export const allMessages = TryCatch(async (req, res) => {
  const messages = await Message.find()
    .populate("sender", "name avatar")
    .populate("chat", " groupChat");

  const transformedMessage = messages.map(
    ({ _id, attachments, content, sender, chat, createdAt }) => {
      console.log(chat);
      return {
        _id,
        attachments,
        content,
        sender: {
          _id: sender._id,
          name: sender.name,
          avatar: sender.avatar.url,
        },
        chat,
        createdAt,
      };
    }
  );

  res.status(200).json({
    success: true,
    messages: transformedMessage,
  });
});

export const getDashboardStats = TryCatch(async (req, res) => {
    const [groupsCount, usersCount, messagesCount, totalChatsCount] =
      await Promise.all([
        Chat.countDocuments({ groupChat: true }),
        User.countDocuments(),
        Message.countDocuments(),
        Chat.countDocuments(),
      ]);
  
    const today = new Date();
  
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
  
    const last7DaysMessages = await Message.find({
      createdAt: {
        $gte: last7Days,
        $lte: today,
      },
    }).select("createdAt");
  
    const messages = new Array(7).fill(0);
    const dayInMiliseconds = 1000 * 60 * 60 * 24;
  
    last7DaysMessages.forEach((message) => {
      const indexApprox =
        (today.getTime() - message.createdAt.getTime()) / dayInMiliseconds;
      const index = Math.floor(indexApprox);
  
      messages[6 - index]++;
    });
  
    const stats = {
      groupsCount,
      usersCount,
      messagesCount,
      totalChatsCount,
      messagesChart: messages,
    };
  
    return res.status(200).json({
      success: true,
      stats,
    });
});

