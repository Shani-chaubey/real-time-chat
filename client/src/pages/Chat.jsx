import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import React, { useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { InputBox } from "../components/styles/StyledComponents";
import { grayColor } from "../constants/color";
import { orange } from "@mui/material/colors";
import FileMenu from './../components/dialogs/FileMenu';
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";

const user = {
  _id: 1,
  name: "Himanshu",
}

const Chat = () => {
  const containerRef = useRef();
  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        height={"90%"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {sampleMessage.map((i)=>(
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </Stack>
      <form style={{ height: "10%" }}>
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton sx={{
            position:'absolute',
            left:'1.5rem',
            rotate:"30deg"
          }}>
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder="Type Message Here..."/>

          <IconButton type="submit" sx={{
            backgroundColor: '#ea7070',
            color:'white',
            marginLeft:'1rem',
            padding:'0.5rem',
            "&:hover":{
              backgroundColor:'error.dark',
            }
          }}>
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </>
  );
};

export default AppLayout()(Chat);
