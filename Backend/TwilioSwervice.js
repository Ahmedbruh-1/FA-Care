require('dotenv').config();
const twilio = require('twilio');

// Your Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Create a Twilio client
const client = twilio(accountSid, authToken);

// Function to send SMS
function sendAppointmentConfirmation(phone, doctor, department) {
  const messageBody = `Your appointment with Dr. ${doctor} in the ${department} department has been booked successfully.`;

  client.messages.create({
    body: messageBody,
    to: phone,  // User's phone number
    from: '+18777804236' // Your Twilio number
  })
  .then((message) => console.log('Message sent: ', message.sid))
  .catch((error) => console.error('Error sending message: ', error));
}

module.exports = { sendAppointmentConfirmation };
