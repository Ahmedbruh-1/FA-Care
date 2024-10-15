import { catchAsyncErrors } from "../Middleware/catchAsyncErrors.js";
import { Report } from "../Models/RepostSchema.js";
import ErrorHandler from "../Middleware/errorMiddleware.js";
import User from '../Models/userSchema.js';

// Function to handle report submission
export const submitReport = catchAsyncErrors(async (req, res, next) => {
    const {
        firstname,
        lastname,
        gender,
        dateOfReport,
        phone,
        age,
        email,
        symptoms,
        medicines,
        durationOfSymptoms,
        severityOfSymptoms,
        previousDiagnoses,
        department,
        doctor_firstName,
        doctor_lastName,
        comments
    } = req.body;

    console.log(
        "department,doctor_firstName,doctor_lastName +++++,"
    );


    // Check if all required fields are provided
    if (!firstname || !lastname || !gender || !dateOfReport || !age || !phone || !email || !symptoms || !medicines || !department ||
        !doctor_firstName || !doctor_lastName || !comments) {
        return next(new ErrorHandler('Please fill in all fields', 400));
    }


    // Check for doctor availability in the department
    const isConflict = await User.find({
        firstname: doctor_firstName,
        lastname: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department,
    });

    if (isConflict.length === 0) {
        return next(new ErrorHandler("Doctor not found", 404));
    }

    if (isConflict.length > 1) {
        return next(
            new ErrorHandler(
                "Doctors Conflict! Please Contact Through Email Or Phone!",
                400
            )
        );
    }

    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;

    // Handle file attachments if provided
    let attachmentsUrl = null;
    if (req.files && req.files.attachments) {
        const attachments = req.files.attachments;

        // Validate file type
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
        if (!allowedFormats.includes(attachments.mimetype)) {
            return next(new ErrorHandler("File Format Not Supported!", 400));
        }

        // Save file (assume using Cloudinary or another service)
        // const result = await cloudinary.v2.uploader.upload(attachments.tempFilePath);
        // attachmentsUrl = result.secure_url;

        // If you're using local storage, handle it accordingly
        // Example: Save to disk or another storage service
        attachmentsUrl = "path-to-saved-file"; // Update this with actual file-saving logic
    }

    // Create a new report entry
    const report = await Report.create({
        firstname,
        lastname,
        gender,
        phone,
        age,
        email,
        dateOfReport,
        symptoms,
        medicines,
        durationOfSymptoms,
        severityOfSymptoms,
        previousDiagnoses,
        department,
        doctor: {
            firstName: doctor_firstName,
            lastName: doctor_lastName,
        },
        attachments: attachmentsUrl, // Save the URL of the uploaded file
        comments,
        patientId,  // Attach the patient ID (req.user._id)
        doctorId,   // Attach the doctor ID
    });

    // Respond with success message
    res.status(201).json({
        success: true,
        message: "Your report has been submitted successfully",
        report
    });
});

// Function to get all reports
export const getAllReports = catchAsyncErrors(async (req, res, next) => {
    const reports = await Report.find();
    res.status(200).json({
        success: true,
        reports,
    });
});

//Deleting the Reports
export const deleteReport = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const report = await Report.findById(id);
    if (!report) {
        return next(new ErrorHandler("Report not found", 404));
    }
    await report.deleteOne();
    res.status(200).json({
        success: true,
        message: "Report has been deleted.",
    });
});
