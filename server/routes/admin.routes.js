import express from 'express'
import { adminLogin, adminLogout, allChats, allMessages, allUsers, getDashboardStats } from '../controllers/admin.controller.js'
import { adminLoginValidator, validateHandler } from '../lib/vaildator.js'

const router = express.Router()

router.get('/')
router.post('/verify',adminLoginValidator(), validateHandler, adminLogin)
router.get('/logout', adminLogout)
router.get('/users', allUsers)
router.get('/chats', allChats)
router.get('/messages', allMessages)
router.get('/stats', getDashboardStats)

export default router;