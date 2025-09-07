import express from 'express';
import { PORT } from './config/env.js';
import AuthRouter from './routes/auth.router.js';
import UsersRouter from './routes/users.router.js';
import IssueRouter from './routes/issues.router.js';
import connectDB from './database/mongodb.js';
import { errorHandler } from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import AnalyticsRouter from './routes/analytics.router.js';
import CommentsRouter from './routes/comments.router.js';

const app = express();

app.use(express.json()); // Parses incoming requests with JSON payloads and is based on the body-parser library.
app.use(express.urlencoded({ extended: false })); // Parses incoming requests with URL-encoded payloads and is based on the body-parser library.
app.use(cookieParser()); // Reads cookies from incoming requests and populates req.cookies with an object keyed by the cookie names.

// Routes
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/users', UsersRouter);
app.use('/api/v1/issues', IssueRouter);
app.use('/api/v1/analytics', AnalyticsRouter);
app.use('/api/v1/comments', CommentsRouter);

// Error handling middleware
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('My AduanKu Server Application is running..,');
});

app.listen(PORT, async () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    console.log(`MongoDB connected to ${process.env.DB_URI}`);
    await connectDB();
});

export default app;