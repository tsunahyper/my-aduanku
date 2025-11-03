import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { PORT } from './config/env.js';
import connectDB from './database/mongodb.js';
import { errorHandler as errorMiddleware } from './middlewares/error.middleware.js';
import IssuesRouter from './routes/issues.router.js';

const app = express();

// CORS configuration
app.use(cors({
	origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'],
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('trust proxy', 1);

app.get('/health', (req, res) => res.status(200).json({ ok: true, service: 'issue-service' }));
app.use('/api/v1/issues', IssuesRouter);
app.use(errorMiddleware);

const SERVICE_PORT = process.env.PORT || PORT || 5003;

app.listen(SERVICE_PORT, async () => {
	console.log(`issue-service listening on http://localhost:${SERVICE_PORT}`);
	await connectDB();
});