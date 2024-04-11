import bcrypt from 'bcrypt'
import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.model.js";
import { sendToken } from '../utils/features.js';
import { ErrorHandler } from '../middlewares/utility.js';

export const newUser = TryCatch(async(req, res, next) => {
  const { name, username, password, bio } = req.body;

  if (!name || !username || !password) {
    return next(new ErrorHandler('Please fill out all the fields'))
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return next(new ErrorHandler('Username Already exists'))
  }

  const avatar = {
    public_id: "ksnd",
    url: "keoeme",
  };

  const newUser = await User.create({ name, username, password, avatar, bio });
  sendToken(res, newUser, 201, "User created successfully");
});

export const login = TryCatch(async (req, res, next) => {
    const {  username, password } = req.body;

    if ( !username || !password) {
        return next(new ErrorHandler('Please fill out all the fields'))
    }

    const user = await User.findOne({ username }).select("+password");
    
    if (!user) {
        return next(new ErrorHandler('Invalid Username'))
    }

    const comparePassword = await bcrypt.compare(password, user.password);
  
    if(!comparePassword){
        return next(new ErrorHandler('Invalid password'))
    }
    sendToken(res, user, 200, `Welcome back ${user.name}`);
});

export const getMyProfile = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({
        success: true,
        user
    });
})

export const logOut = TryCatch(async (req, res) => {
    res.cookie("chat-token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure:true
    }).json({
        success: true,
        message: "Logged out successfully"
    });
})

export const searchUser = TryCatch(async (req, res, next) => {
    const { name } = req.query;
    
    const users = await User.find({
        name: { $regex: name, $options: "i" },
    })

    res.status(200).json({
        success: true,
        count: users.length,
        users
    })

})