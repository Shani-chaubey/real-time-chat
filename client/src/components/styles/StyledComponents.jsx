import { styled } from '@mui/material'
import { Link as LinkComponent } from 'react-router-dom'

export const VisuallyHiddenInput = styled("input")({
    border: 0,
    clip: 'rect(0 0 0 0)',
})

export const Link = styled(LinkComponent)({
    textDecoration: 'none',
    color: 'black',
    padding:'1rem',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    }
})