import { Schema, model, models } from "mongoose";

const requestSchema = new Schema({
    status:{
        type: String,
        default: "pending", //pending, accepted, rejected,
        enum: ["pending", "accepted", "rejected"]
    },
    sender:{
        type: Types.ObjectId,
        ref:"User" ,
        required: true
    },
    receiver:{
        type: Types.ObjectId,
        ref:"User",
        required: true
    },
}, { timestamps:true });

const Request = models.Request || model("Request", requestSchema)
export {Request}