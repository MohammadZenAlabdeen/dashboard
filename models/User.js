import mongoose from "mongoose";
const UserSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        role:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Role"
        }
    }
)

const User=mongoose.models.User||mongoose.model("User",UserSchema);
export default User;