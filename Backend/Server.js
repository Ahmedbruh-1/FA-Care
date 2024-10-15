import app from './app.js';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cloudinary from 'cloudinary'

// Load environment variables
config({ path: './config/config.env' });

// CLOUDINARY SETUP
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// PORT NUMBER
const PORT = process.env.PORT || 5000;

// MongoDB URI
const MONOGO_URI = process.env.MONOGO_URI;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONOGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to database or starting server:', error.message);
    process.exit(1); // Exit the process with failure
  }
};

// Call the function to start the server
startServer();
