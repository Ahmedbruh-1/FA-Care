import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
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
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    phone: {
        type: String,
        required: true,
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    dateOfReport: {
        type: Date,
        default: Date.now,
    },
    symptoms: {
        type: String,
        required: true,
    },
    medicines: {
        type: String,
        required: true,
    },
    durationOfSymptoms: {
        type: String,
        enum:['4 Days', 'A week', '15 Days', 'More than 15 Days']
    },
    severityOfSymptoms: {
        type: String,
        enum: ['Mild', 'Moderate', 'Severe'],
    },
    previousDiagnoses: {
        type: String,
    },
    attachments: [{
        type: Boolean,
        default: false,
    }],
    department: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
    },
    // Group doctor fields under one object
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
    // Optionally you can keep this if needed for relationships
    assignedDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },
});

export const Report = mongoose.model('Report', ReportSchema);
