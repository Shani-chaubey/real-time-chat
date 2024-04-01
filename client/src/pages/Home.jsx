import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material'
import { grayColor } from '../constants/color'

const Home = ()=> {
  return (
    <Box bgcolor={grayColor} height={'100%'} justifyContent={'center'} alignItems={'center'} display={'flex'}>
      <Typography p={"2rem"} variant='h5'>
        Select a friend to start a conversation
      </Typography>
    </Box>
  )
}

export default AppLayout()(Home)