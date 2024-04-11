import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { addMembers, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember, sendAttachments, getChatDetails, renameGroup, deleteChat, getMessages } from '../controllers/chat.controller.js';
import { attachmentsMulter } from '../middlewares/multer.js';

const router = express.Router()

// Logged in user accessible router
//we can use it directly 
router.use(isAuthenticated)

router.post('/new', newGroupChat)
router.get('/my', getMyChats)
router.get('/my/groups', getMyGroups)
router.put('/addmembers', addMembers)
router.put('/removemember', removeMember)
router.delete('/leave/:id', leaveGroup)

//Send Attachments
router.post('/message', attachmentsMulter, sendAttachments)
// Get Messages
router.get('/message/:id', getMessages)
// Get Chat Details, renaming and Deleting
router.route('/:id').get(getChatDetails).put(renameGroup).delete(deleteChat)

export default router;