const { Schema, model, models } = require("mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
    },
    employeeName: {
        type: String,
        required: [true, "Employee Name is required"],
        trim: true,
    },
    status: {
        type: String,
        enum: ["enabled", "disabled"],
        default: "enabled",
        required: true,
    },
    userRole: {
        type: String,
        enum: ["admin", "ess"],
        default: "ess",
        required: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
    },
},
    {
        timestamps: true
    });


const User = models.User || model("User", UserSchema);

module.exports = { User }
