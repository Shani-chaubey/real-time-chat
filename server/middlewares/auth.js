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