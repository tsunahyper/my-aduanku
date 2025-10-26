import mongoose from 'mongoose';

const connectDB = async () => {
  const { DB_URI, NODE_ENV } = process.env; // read at runtime
  if (!DB_URI) {
    console.error('DB_URI is missing. Check your auth-service env file.');
    process.exit(1);
  }
  try {
    mongoose.set('bufferCommands', false);
    await mongoose.connect(DB_URI, { 
      serverSelectionTimeoutMS: 15000,
      retryWrites: false
    });
    console.log(`MongoDB connected in ${NODE_ENV || 'development'} mode`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;