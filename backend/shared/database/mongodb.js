import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../../shared/config/env.js';

if (!DB_URI) {
    throw new Error('DB_URI is not defined, Please define the MONGO DB_URI environment variable within .env.{development, production, test}.local');
}

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`MongoDB connected in ${NODE_ENV} mode`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;