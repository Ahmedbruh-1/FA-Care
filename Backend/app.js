import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbconnection } from "./database/dbconnection.js";
import MessageRouter from "./Router/MessageRouter.js";
import { errorMiddleware } from "./Middleware/errorMiddleware.js";
import UserRouter from "./Router/UserRouter.js";
import cloudinary from "cloudinary";
import AppointmentRouter from "./Router/AppointmentRouter.js";

const app = express();

// Load environment variables from .env file
config({ path: "./config/config.env" });

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// CORS Configuration
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// File Upload Middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.use("/api/v1/message", MessageRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/appointment", AppointmentRouter);

// Database connection
dbconnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
