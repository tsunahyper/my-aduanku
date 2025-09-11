import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT } from '../config/env.js';
import connectDB from '../database/mongodb.js';
import errorMiddleware from '../middlewares/error.middleware.js';
import IssuesRouter from './routes/issues.router.js';
import CommentsRouter from './routes/comments.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Health
app.get('/health', (req, res) => res.status(200).json({ ok: true, service: 'issue-service' }));

// Routes
app.use('/api/v1/issues', IssuesRouter);
app.use('/api/v1/comments', CommentsRouter);

// Errors
app.use(errorMiddleware);

const SERVICE_PORT = process.env.PORT || PORT || 5003;

app.listen(SERVICE_PORT, async () => {
	console.log(`issue-service listening on http://localhost:${SERVICE_PORT}`);
	await connectDB();
});