import { getOtherMember } from "../lib/Helper.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../middlewares/utility.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { deletFilesFromCloudinary, emitEvent } from "../utils/features.js";
import {
  ALERT,
  NEW_ATTCHMENTS,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "./../constants/events.js";

export const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  const allMembers = [...members, req.user._id];
  await Chat.create({
    name,
    groupChat: true,
    creator: req.user._id,
    members: allMembers,
  });

  emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
  emitEvent(req, REFETCH_CHATS, members);

  return res.status(201).json({
    success: true,
    message: "Group chat created successfully",
  });
});

export const getMyChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({ members: req.user._id }).populate(
    "members",
    "name, avatar"
  );

  const transformChats = chats.map((chat) => {
    const otherMember = getOtherMember(chat.members, req.user._id);

    return {
      _id: chat._id,
      groupChat: chat.groupChat,
      avatar: chat.groupChat
        ? chat.members.slice(0, 3).map((member) => member.avatar.url)
        : [otherMember.avatar.url],
      name: chat.groupChat ? chat.name : otherMember.name,
      members: chat.members.reduce((prev, acc) => {
        if (acc._id.toString() !== req.user._id.toString()) {
          prev.push(acc._id);
        }
        return prev;
      }, []),
    };
  });

  return res.status(200).json({
    success: true,
    chats: transformChats,
  });
});

export const getMyGroups = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({
    members: req.user._id,
    groupChat: true,
  }).populate("members", "name, avatar");

  const groups = chats.map(({ _id, name, groupChat, members }) => {
    return {
      _id,
      groupChat,
      name,
      avatar: members.map((i) => i.avatar.url),
    };
  });

  return res.status(200).json({
    success: true,
    groups,
  });
});

export const addMembers = TryCatch(async (req, res, next) => {
  const { chatId, members } = req.body;

  const chat = await Chat.findById(chatId).populate("members", "name");
  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("Chat is not a group chat", 404));
  if (chat.creator.toString() !== req.user._id.toString())
    return next(
      new ErrorHandler("You are not allowed to add members to this chat", 401)
    );

  members.map((i) => {
    chat.members.map(({ _id, name }) => {
      if (_id.toString() === i.toString())
        return next(
          new ErrorHandler(`${name} is already added to the group`, 400)
        );
    });
  });

  const allMembers = [...chat.members, ...members];

  const newChat = await Chat.findByIdAndUpdate(
    chatId,
    { members: allMembers },
    { new: true }
  ).populate("members", "name");

  const allNewMembersPromise = members.map((i) => User.findById(i, "name"));

  const allNewMembers = await Promise.all(allNewMembersPromise);

  emitEvent(
    req,
    ALERT,
    newChat.members,
    `${allNewMembers} has been added in the group`
  );

  emitEvent(req, REFETCH_CHATS, newChat.members);

  return res.status(200).json({
    success: true,
    newChat,
    allNewMembers,
  });
});

export const removeMember = TryCatch(async (req, res, next) => {
  const { chatId, userId } = req.body;
  const [chat, user] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId),
  ]);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("Chat is not a group chat", 404));

  if (chat.creator.toString() !== req.user._id.toString())
    return next(
      new ErrorHandler(
        "You are not allowed to remove members from this chat",
        401
      )
    );
  if (chat.members.length < 3)
    return next(new ErrorHandler("Group Must have atleast 3 members", 400));

  chat.members = chat.members.filter((i) => i.toString() !== userId.toString());
  await chat.save();

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${user.name} has been removed from the group`
  );
  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: `${user.name} removed from the group`,
    chat,
  });
});

export const leaveGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;

  const user = await User.findById(req.user._id);
  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  if (!chat.members.includes(req.user._id)) {
    return next(new ErrorHandler("You are not a member of this group", 401));
  }

  if (!chat.groupChat)
    return next(new ErrorHandler("Chat is not a group chat", 404));

  const remainingMember = chat.members.filter(
    (i) => i.toString() !== req.user._id.toString()
  );

  if (remainingMember.length < 3) {
    chat.members = remainingMember;
    chat.groupChat = false;
  }

  if (chat.creator === req.user._id) {
    const newCreator = remainingMember[0];
    chat.creator = newCreator;
  }

  chat.members = remainingMember;

  await chat.save();

  return res.status(200).json({
    success: true,
    message: `${user.name} left the group`,
    chat,
  });
});

export const sendAttachments = TryCatch(async (req, res, next) => {
  const { chatId } = req.body;
  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  const user = await User.findById(req.user._id);

  const files = req.files || [];

  if (files.length === 0) return next(new ErrorHandler("No files found", 404));

  const attachments = [];

  const messageForRealTime = {
    content: "",
    sender: {
      _id: user._id,
      name: user.name,
    },
    chat: chat._id,
    attachments,
  };
  const messageForDB = {
    content: "",
    sender: user._id,
    chat: chat._id,
    attachments,
  };

  emitEvent(req, NEW_ATTCHMENTS, chat.members, {
    message: messageForRealTime,
    chatId: chat._id,
  });
  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, chatId);

  const message = await Message.create(messageForDB);

  return res.status(200).json({
    success: true,
    message: `Attachment Sent Successfully`,
    message,
  });
});

export const getMessages = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const { page = 1 } = req.query;
  const limit = 20;
  const skip = (page - 1) * limit;

  const messages = await Message.find({ chat: chatId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("sender", "name avatar")
    .lean();

  const totalMessagesCount = await Message.countDocuments({ chat: chatId });
  const totalPages = Math.ceil(totalMessagesCount / limit);

  return res.status(200).json({
    success: true,
    messages: messages.reverse(),
    totalMessagesCount,
    totalPages,
  });
});

export const getChatDetails = TryCatch(async (req, res, next) => {
  if (req.query.populate === "true") {
    const chat = await Chat.findById(req.params.id)
      .populate("members", "name avatar")
      .lean();
    if (!chat) return next(new ErrorHandler("Chat not found", 404));

    chat.members = chat.members.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar.url,
    }));

    return res.status(200).json({
      success: true,
      chat,
    });
  } else {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return next(new ErrorHandler("Chat not found", 404));

    return res.status(200).json({
      success: true,
      chat,
    });
  }
});

export const renameGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const { name } = req.body;

  const chat = await Chat.findById(chatId);
  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHandler("Chat is not a group chat", 404));

  if (chat.creator.toString() !== req.user._id.toString())
    return next(
      new ErrorHandler("You are not allowed to rename this chat", 401)
    );

  chat.name = name;
  await chat.save();

  emitEvent(req, REFETCH_CHATS, chat.members);
  return res.status(200).json({
    success: true,
    chat,
    message: `${chat.name} renamed successfully`,
  });
});

export const deleteChat = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  const members = chat.members;

  if (chat.groupChat && chat.creator.toString() !== req.user._id.toString())
    return next(
      new ErrorHandler("You are not allowed to delete this chat", 401)
    );

  if (!chat.groupChat && !chat.members.includes(req.user._id))
    return next(
      new ErrorHandler("You are not allowed to delete this chat", 401)
    );

  // Here we have to delete all the message as well as attachments or files from cloudinary

  const messagesWithAttachments = await Message.find({
    chat: chatId,
    attachments: { $exists: true, $ne: [] },
  });

  const public_id = [];

  messagesWithAttachments.forEach((message) => {
    message.attachments.forEach((attachment) => {
      public_id.push(attachment.public_id);
    });
  });

  await Promise.all([
    // Delete files from cloudinary
    deletFilesFromCloudinary(public_id),
    chat.deleteOne(),
    Message.deleteMany({ chat: chatId }),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: `${chat.name} deleted successfully`,
  });
});


