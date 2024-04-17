import { Face as FaceIcon, AlternateEmail as UserNameIcon, CalendarMonth as CalenderIcon } from "@mui/icons-material";
import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import moment from 'moment'

const Profile = () => {
  return (
    <Stack spacing={"2rem"} alignItems={"center"} direction={"column"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard text={"Himanshu Chaturvedi"} heading={"Bio"} Icon={<UserNameIcon />}/>
      <ProfileCard text={"Himanshu Shani"} heading={"User"} Icon={<FaceIcon />} />
      <ProfileCard text={moment("2024-04-11T00:00:00.000Z").fromNow()} heading={"Joined"} Icon={<CalenderIcon />} />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignContent={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography variant="caption" color={'gray'}>{heading}</Typography>
    </Stack>
  </Stack>
);

export default Profile;
