import express from 'express';
import {  getMyProfile, logOut, login, newUser, searchUser } from '../controllers/user.controller.js';
import { multerUpload } from './../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router()

router.post('/new', multerUpload.single('avatar'),  newUser)
router.post('/login', login)

// Logged in user accessible router

//we can use it directly 
router.use(isAuthenticated)

router.get('/me', getMyProfile)
router.get('/logout', logOut)
router.get('/search', searchUser)

export default router;