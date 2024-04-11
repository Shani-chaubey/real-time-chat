import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { newGroupChat } from '../controllers/chat.controller.js';

const router = express.Router()

// Logged in user accessible router
//we can use it directly 
router.use(isAuthenticated)

router.post('/new', newGroupChat)

export default router;