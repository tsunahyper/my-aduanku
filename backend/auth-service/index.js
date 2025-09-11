import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT } from '../shared/config/env.js';
import connectDB from '../shared/database/mongodb.js';
import { errorHandler as errorMiddleware } from '../shared/middlewares/error.middleware.js';
import AuthRouter from './routes/auth.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Health
app.get('/health', (req, res) => res.status(200).json({ ok: true, service: 'auth-service' }));

// Routes
app.use('/api/v1/auth', AuthRouter);

// Errors
app.use(errorMiddleware);

const SERVICE_PORT = process.env.PORT || PORT || 5001;

app.listen(SERVICE_PORT, async () => {
	console.log(`auth-service listening on http://localhost:${SERVICE_PORT}`);
	await connectDB();
});