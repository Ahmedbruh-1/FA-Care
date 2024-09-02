import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import User from "../Models/userSchema.js";
import jwt from "jsonwebtoken";


// Authentication for Admin
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;

    if (!token) {
        return next(new ErrorHandler("Admin is Not Authenticated!", 400));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (req.user.role !== "Admin") {
        return next(new ErrorHandler(
            `${req.user.role} Not Authorized For this Resource!`,
            403
        ));
    }

    next();
});

// Authentication for Patient
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;

    if (!token) {
        return next(new ErrorHandler("User is Not Authenticated!", 400));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    
    if (req.user.role !== "Patient") {
        return next(new ErrorHandler(
            `${req.user.role} Not Authorized For this Resource!`,
            403
        ));
    }

    next();
});
