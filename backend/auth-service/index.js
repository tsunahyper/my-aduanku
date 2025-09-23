import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT } from './config/env.js';
import connectDB from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import AuthRouter from './routes/auth.router.js';

const app = express();
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