import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT } from '../shared/config/env.js';
import connectDB from '../shared/database/mongodb.js';
import errorMiddleware from '../shared/middlewares/error.middleware.js';
import AnalyticsRouter from './routes/analytics.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Health
app.get('/health', (req, res) => res.status(200).json({ ok: true, service: 'analytics-service' }));

// Routes
app.use('/api/v1/analytics', AnalyticsRouter);

// Errors
app.use(errorMiddleware);

const SERVICE_PORT = process.env.PORT || PORT || 5004;

app.listen(SERVICE_PORT, async () => {
	console.log(`analytics-service listening on http://localhost:${SERVICE_PORT}`);
	await connectDB();
});