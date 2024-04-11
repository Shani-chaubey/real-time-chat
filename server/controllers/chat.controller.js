import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../middlewares/utility.js";
import { Chat } from "../models/chat.model.js";

export const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;
  if (members.length < 2) {
    return next(
      new ErrorHandler("At least 3 members are required to form a group chat")
    );
  }

  const allMembers = [...members, req.user._id];
  await Chat.create({
    name,
    groupChat: true,
    creator: req.user._id,
    members: allMembers,
  });
  

});
