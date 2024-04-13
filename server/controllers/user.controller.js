import bcrypt from "bcrypt";
import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.model.js";
import { emitEvent, sendToken } from "../utils/features.js";
import { ErrorHandler } from "../middlewares/utility.js";
import { Chat } from "../models/chat.model.js";
import { Request } from "../models/request.model.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/Helper.js";

export const newUser = TryCatch(async (req, res, next) => {
  const { name, username, password, bio } = req.body;
  const file = req.file

  if(!file) return next(new ErrorHandler("Please upload a profile picture"))

  if (!name || !username || !password) {
    return next(new ErrorHandler("Please fill out all the fields"));
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return next(new ErrorHandler("Username Already exists"));
  }

  const avatar = {
    public_id: "ksnd",
    url: "keoeme",
  };

  const newUser = await User.create({ name, username, password, avatar, bio });
  sendToken(res, newUser, 201, "User created successfully");
});

export const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorHandler("Please fill out all the fields"));
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Username"));
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    return next(new ErrorHandler("Invalid password"));
  }
  sendToken(res, user, 200, `Welcome back ${user.name}`);
});

export const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const logOut = TryCatch(async (req, res) => {
  res
    .cookie("chat-token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const searchUser = TryCatch(async (req, res, next) => {
  const { name } = req.query;

  const allChats = await Chat.find({
    groupChat: false,
    members: { $in: req.user._id },
  });

  // All users with whome i have a chat
  const allUserFromMyChats = allChats.map((chat) => chat.members).flat();
  const getFrineds = [];
  allUserFromMyChats.find((user) => {
    if (user.toString() !== req.user._id.toString()) {
      getFrineds.push(user);
    }
  });

  // All users except me and my friends
  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: [...getFrineds, req.user._id] },
    name: { $regex: name, $options: "i" },
  });
  const remainingUsers = allUsersExceptMeAndFriends.map((i) => ({
    _id: i._id,
    name: i.name,
    avatar: i.avatar.url,
  }));

  res.status(200).json({
    success: true,
    getFrineds,
    remainingUsers,
  });
});

export const sendFriendRequest = TryCatch(async (req, res, next) => {
  const { userId } = req.body;
  const requestByMySide = await Request.findOne({
    sender: req.user._id,
    receiver: userId,
  });

  if (requestByMySide) {
    return next(new ErrorHandler("You already sent a frind reuest"));
  }

  const requestByOtherSide = await Request.findOne({
    sender: userId,
    receiver: req.user._id,
  });

  if (requestByOtherSide) {
    return next(new ErrorHandler("User already sent you a friend request"));
  }

  await Request.create({
    sender: req.user._id,
    receiver: userId,
  });

  emitEvent(req, NEW_REQUEST, [userId]);

  res.status(200).json({
    success: true,
    message: "Request sent successfully",
  });
});

export const acceptFriendRequest = TryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;

  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");

  if (!request) {   
    return next(new ErrorHandler("Request not found", 404));
  }

  if (request.receiver._id.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler("You are not authorized to accept this request", 401)
    );
  }

  if (!accept) {
    await request.remove();
    return res.status(200).json({
      success: true,
      message: "Friend Request rejected",
    });
  }

  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name}-${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  res.status(200).json({
    success: true,
    message: "Friend Request Accepted",
    senderId: request.sender._id,
  });
});

export const getAllNotifications = TryCatch(async (req, res, next) => {
  const request = await Request.find({ receiver: req.user._id }).populate(
    "sender",
    "name avatar"
  );
  const allRequests = request.map(({ _id, sender }) => ({
    _id,
    sender: {
      _id: sender._id,
      name: sender.name,
      avatar: sender.avatar.url,
    },
  }));
  res.status(200).json({
    success: true,
    allRequests,
  });
});

export const getMyFriends = TryCatch(async (req, res, next) => {
    const chatId = req.query.chatId
    
    const chats = await Chat.find({members: req.user._id, groupChat: false }).populate("members", "name avatar")
    console.log(chats)
    const friends = chats.map(({members}) => {
        const otherUser = getOtherMember(members, req.user._id)
        return {
            _id: otherUser._id,
            name: otherUser.name,
            avatar: otherUser.avatar.url,
        }
    })
    if(chatId){
        const chat = await Chat.findById(chatId)
        const availableFrinds = friends.filter((i) => !chat.members.includes(i._id))
        return res.status(200).json({
            success: true,
            friends: availableFrinds,
        })
    }else{
        return res.status(200).json({
            success: true,
            friends,
        })
    }
})
