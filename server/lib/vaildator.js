import {body, check, param, query, validationResult} from 'express-validator'
import { ErrorHandler } from '../middlewares/utility.js';

export const validateHandler = (req,res,next)=>{
    const errors = validationResult(req);
    const errorMessage = errors.array().map((err)=>err.msg).join(', ');

    if(!errors.isEmpty()){
        return next(new ErrorHandler(errorMessage))
    }else{
        next(); // if no error then move to next middleware
    }
     
}

export const registerValidator = ()=> [
    body('name','Please Enter Name').notEmpty(),
    body('username','Username must be of 3 characters').notEmpty().isLength({min:3}),
    body('password','Please Enter Password').notEmpty(),
    body('bio','Please Enter About Yourself').notEmpty(),
    check('avatar').notEmpty().withMessage('Please Upload Your Profile Picture'),
];

export const loginValidator = ()=> [
    body('username',' Please Enter Username').notEmpty(),
    body('password','Please Enter Password').notEmpty(),
];

export const newGroupValidator = ()=> [
    body('name',' Please Enter Group Name').notEmpty(),
    body('members').notEmpty().withMessage('Please add members').isArray({min: 2, max: 256}).withMessage('Members must be between 2-256'),
];

export const addMemberValidator = ()=> [
    body('chatId',' Please Enter Chat ID').notEmpty(),
    body('members').notEmpty().withMessage('Please add members').isArray({min: 1, max: 256}).withMessage('Members must be between 2-254'),
];

export const removeMemberValidator = ()=> [
    body('chatId',' Please Enter Chat ID').notEmpty(),
    body('userId',' Please Enter User ID which you want to remove').notEmpty(),
];

export const leaveGroupValidator = () => [
    param('id',' Please Enter Chat ID from which you want to leave').notEmpty(),
];

export const sendAttachmentsValidator = () => [
    body('chatId',' Please Enter Chat ID').notEmpty(),
    check('files').notEmpty().withMessage('Please Upload Attachments').isArray({min: 1, max: 10}).withMessage('Members must be between 1-10'),
];

export const getMessagesValidator = () => [
    param('id',' Please Enter Chat ID').notEmpty(),
];

export const chatIdValidator = () => [
    param('id',' Please Enter Chat ID').notEmpty(),
];

export const userIdValidator = () => [
    body('userId',' Please Enter User ID').notEmpty(),
];

export const renameGroupValidator = () => [
    param('id',' Please Enter Chat ID').notEmpty(),
    body('name',' Please Enter Group Name').notEmpty(),
];

export const acceptRequestValidator = () => [
    body('requestId',' Please Enter Request ID').notEmpty(),
    body('accept').notEmpty().withMessage('Please Accept').isBoolean().withMessage('Accept must be Boolean'),
];

export const adminLoginValidator = () => [
    body('secretKey',' Please Enter Secret Key').notEmpty(),
];




















