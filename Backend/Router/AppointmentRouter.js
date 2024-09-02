import express from "express";
import { postAppointment  ,deleteAppointment, getAllAppointments, updateAppointmentStatus } from "../Controller/AppointmentController.js";
import {
    isAdminAuthenticated
    , isPatientAuthenticated
} from "../Middleware/auth.js";

const router = express.Router();

router.post("/post", isPatientAuthenticated, postAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);


export default router;
