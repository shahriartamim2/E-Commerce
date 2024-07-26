import mongoose from 'mongoose';
import { mongoUrl } from '../src/secret.js';


const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log('MongoDB connection SUCCESS');
  } catch (error) {
    console.error('MongoDB connection FAIL');
    process.exit(1);
  }
}

export default connectDB;