import express from 'express';
import { PORT } from './config/env.js';
import cookieParser from 'cookie-parser';
import connectDB from './database/mongodb.js';
import AnalyticsRouter from './routes/analytics.router.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(express.json()); // Parses incoming requests with JSON payloads and is based on the body-parser library.
app.use(express.urlencoded({ extended: false })); // Parses incoming requests with URL-encoded payloads and is based on the body-parser library.
app.use(cookieParser()); // Reads cookies from incoming requests and populates req.cookies with an object keyed by the cookie names.
app.set('trust proxy', 1);

// Routes
app.use('/api/v1/analytics', AnalyticsRouter);

// Error handling middleware
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('My Aduanku Analytics services running...');
});

app.listen(PORT, async () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    console.log(`MongoDB connected to ${process.env.DB_URI}`);
    await connectDB();
});

export default app;