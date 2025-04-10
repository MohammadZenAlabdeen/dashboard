import mongoose from "mongoose";

const RoleSchema=new mongoose.Schema({
    name:{
        type:String
    },
    permissions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Permission",
    }],
    users: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
})
const Role=mongoose.models.Role||mongoose.model("Role",RoleSchema);

export default Role;