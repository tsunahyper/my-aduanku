import mongoose from './mongoose.js';
import { DB_URI, NODE_ENV } from '../config/env.js';

const connectDB = async () => {
  try {
    mongoose.set('bufferCommands', false);        // fail fast if not connected
    await mongoose.connect(DB_URI, { 
      serverSelectionTimeoutMS: 15000,
      retryWrites: false
    });
    console.log(`MongoDB connected in ${NODE_ENV} mode`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;