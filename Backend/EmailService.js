import nodemailer from 'nodemailer';

// Configure the transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.your-email-provider.com', // e.g., smtp.gmail.com for Gmail
  port: 587, // or 465 for SSL
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS, // your email password
  },
});

// Function to send appointment confirmation email
export const sendAppointmentEmail = async (to, doctor, department) => {
  const message = {
    from: process.env.EMAIL_USER, // sender address
    to, // list of receivers
    subject: 'Appointment Confirmation', // Subject line
    text: `Your appointment with Dr. ${doctor} in the ${department} department has been booked successfully.`, // plain text body
    // html: '<b>Hello world?</b>' // If you want to send HTML content
  };

  try {
    const info = await transporter.sendMail(message);
    console.log('Email sent: ', info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
    throw new Error('Could not send email');
  }
};
