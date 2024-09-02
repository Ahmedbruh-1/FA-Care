import { request } from "express";
import { catchAsyncErrors } from "../Middleware/catchAsyncErrors.js";
import ErrorHandler from "../Middleware/errorMiddleware.js";
import User from "../Models/userSchema.js";
import { generateToken } from "../utils/jwtTokens.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    gender,
    dob,
    password,
    cnic,
    role,
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !gender ||
    !dob ||
    !password ||
    !cnic ||
    !role
  ) {
    return next(new ErrorHandler("Please fill out the form completely", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already registered", 400));
  }

  user = await User.create({
    firstname,
    lastname,
    email,
    phone,
    gender,
    dob,
    password,
    cnic,
    role,
  });

  generateToken(user, "User Registered!", 200, res);
});

// Login
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please Provide Valid Details", 400));
  }
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password Should be the Same", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Password or Email", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Password or Email", 400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("User with this Role not Found", 400));
  }
  generateToken(user, "User Login Successfully!", 200, res);
});

// Adding New Admin
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstname, lastname, email, phone, gender, dob, password, cnic } =
    req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !gender ||
    !dob ||
    !password ||
    !cnic
  ) {
    return next(new ErrorHandler("Please fill out the form completely", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(`${isRegistered.role} already registered`, 400)
    );
  }

  const admin = await User.create({
    firstname,
    lastname,
    email,
    phone,
    gender,
    dob,
    password,
    cnic,
    role: "Admin",
  });

  res.status(200).json({
    success: true,
    message: "New Admin Registered!",
    admin,
  });
});

// Getting all doctors
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

// Getting user details
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
//loging out for Admin
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logout Successfully!",
    });
});
//loging out for Patient
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Logout Successfully!",
    });
});

//Adding New Doctor
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  console.log(req)
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }
  // console.log(req.body)
  const {
    firstName,
    lastName,
    email,
    phone,
   cnic,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !cnic ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment 
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler("Doctor With This Email Already Exists!", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
    );
  }
  const doctor = await User.create({
    firstname:firstName,
    lastname:lastName,
    email,
    phone,
    cnic,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New Doctor Registered",
    doctor,
  });
});
//deleting a doctor
// Deleting a doctor
export const deleteDoctor = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const doctor = await User.findById(id);

  if (!doctor || doctor.role !== "Doctor") {
    return next(new ErrorHandler("Doctor not found", 404));
  }

  await doctor.deleteOne();
  res.status(200).json({
    success: true,
    message: "Doctor has been deleted.",
  });
});
