import express from 'express';
import { getAllMessages, sendMessage, deleteMessage } from '../Controller/MessageController.js';
import { isAdminAuthenticated } from '../Middleware/auth.js';

const router = express.Router();

router.post('/send', sendMessage);
router.get('/getall', isAdminAuthenticated,getAllMessages);
router.delete('/delete/:id', isAdminAuthenticated, deleteMessage)

export default router;