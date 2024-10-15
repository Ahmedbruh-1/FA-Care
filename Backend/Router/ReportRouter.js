import express from 'express';
import { submitReport, getAllReports, deleteReport } from '../Controller/ReportFormController.js';
import {isPatientAuthenticated, isAdminAuthenticated} from "../Middleware/auth.js";

const router= express.Router();


router.post('/sendreport',isPatientAuthenticated, submitReport);
router.get('/getreports', getAllReports);
router.delete('/deletereport/:id',isAdminAuthenticated, deleteReport);

export default router;