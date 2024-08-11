import mongoose from 'mongoose';
import { mongoUrl } from '../secret.js';
import logger from '../controllers/logger.controller.js';


const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    logger.log('info','MongoDB connection SUCCESS');
  } catch (error) {
    logger.error('error','MongoDB connection FAIL');
    process.exit(1);
  }
}

export default connectDB;