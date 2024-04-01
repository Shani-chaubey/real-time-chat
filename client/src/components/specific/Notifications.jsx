import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Typography
} from "@mui/material";
import React, { memo } from "react";
import { sampleNotifications } from "../../constants/sampleData";


const notifications = () => {
  const frinedRequestHandler = (_id, accept) => {
    console.log(_id);
  };
  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"30rem"}>
        <DialogTitle textAlign={"center"}>Notification</DialogTitle>
        {sampleNotifications.length > 0 ? (
          <>
            {sampleNotifications.map((i) => (
              <NotificationItem
                sender={i.sender}
                _id={i._id}
                handler={frinedRequestHandler}
              />
            ))}
          </>
        ) : (
          <Typography textAlign={"center"}>0 Notifications</Typography>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignContent={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width:'100%'
          }}
        >
          {`${name} sent  you a friend request.`}
        </Typography>
        <Stack direction={{
          xs: "column",
         sm:'row'
        }}>
          <Button onClick={()=>handler({_id, accept:true})}>Accept</Button>
          <Button onClick={()=>handler({_id, accept:false})}>Decline</Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default notifications;
