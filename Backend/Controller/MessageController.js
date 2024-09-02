import {catchAsyncErrors} from "../Middleware/catchAsyncErrors.js";
import {Message} from '../Models/MessageSchema.js'; 
import ErrorHandler from "../Middleware/errorMiddleware.js";


export const sendMessage = catchAsyncErrors(async(req,res,next) =>{
    const {firstname, lastname, email, phone, message} = req.body;
    if (!firstname || !lastname || !email || !phone || !message){
        return next (new ErrorHandler('Please Fill up the Form', 400));
    }
        await Message.create({firstname, lastname, email, phone, message});
        res.status(200).json({
            success: true,
            message: "Message has been sent"
        });
    
});
//Getting All messages
export const getAllMessages = catchAsyncErrors(async(req,res,next)=>{
    const messages = await Message.find();
    res.status(200).json({
        success: true,
        messages,
    });
});
// Deleting a message
export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const message = await Message.findById(id);
    
    if (!message) {
      return next(new ErrorHandler("Message not found", 404));
    }
    
    await message.deleteOne();
    
    res.status(200).json({
      success: true,
      message: "Message has been deleted.",
    });
  });