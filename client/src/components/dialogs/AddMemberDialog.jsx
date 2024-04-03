import { Button, Dialog, DialogActions, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const addFriendHandler = () => {
    console.log("Add Friend Handler");
  };
  const addMemberSubmitHandler = () => {
    console.log("Submit Handler");
    closeHandler()
  };
  const closeHandler = () => {
    setMembers([])
    setSelectedMembers([])
    console.log("Close Handler");
  };
  const [members, setMembers] = useState(sampleUsers)
  const [selectedMembers, setSelectedMembers] = useState([])
  const selectMemberHandler = (id)=>{
    setSelectedMembers((prev)=> prev.includes(id) ? prev.filter((i)=>i!== id)  : [...prev, id])
  }
  
  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={'2rem'} width={'20rem'} spacing={'2rem'}>
        <DialogTitle textAlign={'center'}>Add Member</DialogTitle>
        <Stack>
          { members.length > 0 ? (
            members.map((user) => (
              <UserItem key={user._id} user={user} handler={selectMemberHandler} isAdded={selectedMembers.includes(user._id)}/>
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends Found</Typography>
          )}
        </Stack>
        <DialogActions>
            <Button variant='outlined' color="error" onClick={closeHandler}>Cancel</Button>
            <Button color='success' variant='outlined' disabled={isLoadingAddMember} onClick={addMemberSubmitHandler} >Submit</Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
