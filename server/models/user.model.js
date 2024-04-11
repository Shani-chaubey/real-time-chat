import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    name:{
        type: String, 
        required: true,
    },
    username:{
        type: String, 
        unique: true,
        required: true,
    },
    password :{
        type: String, 
        required: true,
        select: false
    },
    avatar:{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    bio:{
        type: String,
    },
}, { timestamps:true });

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
})

const User = mongoose.models.User || model("User", userSchema)
export { User }