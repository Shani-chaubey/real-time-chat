export const getOtherMember = (members, currentUserId) => {
    return members.find(member => member._id.toString() !== currentUserId.toString());
}