import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

const ConfirmDeleteDialog = ({open, handleClose, deleteHandler}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete This Group</DialogTitle>
        <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this group?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button variant='outlined' onClick={handleClose}>No</Button>
            <Button onClick={deleteHandler} color='error' variant='outlined'>Yes</Button>
        </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteDialog