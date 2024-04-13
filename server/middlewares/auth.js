import jwt from 'jsonwebtoken';
import { ErrorHandler } from "./utility.js";

export const isAuthenticated =  (req, res, next) => {
    const token = req.cookies['chat-token']
    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401))
    }
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user;
    next();
}

export const adminOnly =  (req, res, next) => {
    const token = req.cookies['admin_token']
    if (!token) {
        return next(new ErrorHandler("Only admin can access this resource", 401))
    }
    const adminKey = jwt.verify(token, process.env.JWT_SECRET)

    if(!adminKey === process.env.ADMIN_SECRETKEY) return next(new ErrorHandler("Only admin can access this resource", 401))
    else return next();
}