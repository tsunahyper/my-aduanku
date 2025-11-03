import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT } from './config/env.js';
import connectDB from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import CommentsRouter from './routes/comments.router.js';
import cors from 'cors';

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

// Health
app.get('/health', (req, res) => res.status(200).json({ ok: true, service: 'comments-service' }));

// Routes
app.use('/api/v1/comments', CommentsRouter);

// Errors
app.use(errorMiddleware);

const SERVICE_PORT = process.env.PORT || PORT || 5005;

app.listen(SERVICE_PORT, async () => {
	console.log(`comments-service listening on http://localhost:${SERVICE_PORT}`);
	await connectDB();
});