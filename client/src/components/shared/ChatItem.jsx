import React, { memo } from 'react'
import { Link } from '../styles/StyledComponents'
import { Box, Stack, Typography } from '@mui/material'
import AvatarCrad from './AvatarCrad'


const ChatItem = ({avatar=[], name, _id, groupChat, sameSender, isOnline, newMessageAlert, index=0, handleDeleteChat}) => {
  return (
   <Link to={`/chat/${_id}`} onContextMenu={(e)=>{handleDeleteChat(e, _id, groupChat)}} sx={{
    padding:'0rem'
   }}>
     <div style={{
       display: "flex",
       alignItems: "center",
       padding: "1rem",
       borderBottom: "1px solid #f0f0f0",
       backgroundColor: sameSender ? "black" : "unset",
       color: sameSender ? "white" : "unset",
       gap:'1rem',
       position:'relative'
     }}>
        <AvatarCrad avatar={avatar} />
        <Stack>
            <Typography color={'white'}>
              {name}
            </Typography>
            {
                newMessageAlert && <Typography>{newMessageAlert.count} New Messages</Typography>
            }
        </Stack>
        {
            isOnline && <Box sx={{
                width:'10px',
                height:'10px',
                borderRadius:'50%',
                backgroundColor:'blue',
                position:'absolute',
                right:'1rem',
                top:'50%',
                transform:'translateY(-50%)'
            }} />
        }
     </div>
   </Link>
  )
}

export default memo(ChatItem)