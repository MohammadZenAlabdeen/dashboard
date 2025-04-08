import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
    }]
})

const Permission = mongoose.models.Permission || mongoose.model("Permission", PermissionSchema);
export default Permission;