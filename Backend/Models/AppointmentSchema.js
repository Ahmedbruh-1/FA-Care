import mongoose from "mongoose";
import validator from "validator";
const { isEmail } = validator;

const AppointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, "First Name must contain at least 3 characters!"]
    },
    lastName: {
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
    },
    cnic: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: [true, "DOB is required"]
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    appointment_date: {
        type: Date,
        required: true
    },
    department: {
        type: String,
        required: true,
    },
    doctor: {
        firstName: {
            type: String,
            required: [true, "Doctor Name Is Required!"],
        },
        lastName: {
            type: String,
            required: [true, "Doctor Name Is Required!"],
        },
    },
    hasVisited: {
        type: Boolean,
        default: false,
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Doctor Id Is Invalid!"],
      },
      patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Patient Id Is Required!"],
      },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Accepted", "Rejected", "Pending"],
        default: "Pending",
    },
});

export const Appointment = mongoose.model("Appointment", AppointmentSchema);
