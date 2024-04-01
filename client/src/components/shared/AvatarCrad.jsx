import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";

const AvatarCrad = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup max={max}>
      <Box width={'5rem'} height={'3rem'}>

      </Box>
        {avatar.map((item, index) => (
          <Avatar
            key={Math.random()*100}
            src={item}
            alt={`${index}-Avatar`}
            sx={{
              width: "3rem",
              height: "3rem",
              position: 'absolute',
              left:{
                xs:`${0.5+index}rem`,
                sm:`${index}rem`
              }
            }}
          />
        ))}
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCrad;