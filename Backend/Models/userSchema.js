import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
const { isEmail } = validator;

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: [3, "First Name must contain at least 3 characters!"]
    },
    lastname: {
        type: String,
        required: true,
        minlength: [3, "Last Name must contain at least 3 characters!"]
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail, "Please provide a valid email"]
    },
    phone: {
        type: String,
        required: true,
        minlength: [11, "Phone number must contain exactly 11 digits!"],
        maxlength: [11, "Phone number must contain exactly 11 digits!"]
    },
    cnic: {
        type: String,
        required: true,
        minlength: [13, "CNIC must contain exactly 13 digits!"],
        maxlength: [13, "CNIC must contain exactly 13 digits!"]
    },
    dob: {
        type: String,
        required: [true, "DOB is required"]
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    password: {
        type: String,
        minlength: [8, "Password must contain at least 8 characters"],
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctorDepartment: {
        type: String
    },
    docAvatar: {
        public_id: String,
        url: String
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
    return JWT.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

const User = mongoose.model("User", userSchema);  // Default export
export default User;  // Added default export
