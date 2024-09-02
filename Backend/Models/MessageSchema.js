import mongoose from 'mongoose';
import validator from 'validator';
const { isEmail } = validator;

const messageSchema = new mongoose.Schema({
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
        minlength: [11, "Phone number must contain 11 digits!"],
        maxlength: [11, "Phone number must contain 11 digits"]
    },
    message: {
        type: String,
        required: true
    }
});

export const Message = mongoose.model("Message", messageSchema);
