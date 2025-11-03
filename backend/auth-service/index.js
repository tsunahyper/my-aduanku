import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { PORT } from './config/env.js';
import connectDB from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import AuthRouter from './routes/auth.router.js';

const app = express();

// CORS configuration - Allow all origins in development for Docker compatibility
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001']
    : true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('trust proxy', 1);

app.use('/api/v1/auth', AuthRouter);
app.use(errorMiddleware);

const SERVICE_PORT = process.env.PORT || PORT || 5001;

(async () => {
  await connectDB();
  app.listen(SERVICE_PORT, () => console.log(`auth-service @ http://localhost:${SERVICE_PORT}`));
})();