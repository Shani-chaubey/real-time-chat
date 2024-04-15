import { userSocketIDs } from "../app.js";

export const getOtherMember = (members, currentUserId) => {
    return members.find(member => member._id.toString() !== currentUserId.toString());
}

export const getSockets = (users = [])=>{
    const sockets = users.map(user=> userSocketIDs.get(user._id.toString()));
    return sockets;
}