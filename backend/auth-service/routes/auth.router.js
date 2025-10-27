import { Router } from "express";
import { register, login, adminLogin, userLogin, logout } from "../controllers/auth.controller.js";
import { authLimiter } from '../middlewares/rateLimit.middleware.js';

const AuthRouter = Router();

AuthRouter.get('/health', (req, res) => {
    res.status(200).json({ ok: true, service: 'auth-service', time: new Date().toISOString() });
});

AuthRouter.post('/register', authLimiter, (req, res, next) => {
    register(req, res, next);
});

AuthRouter.post('/login', authLimiter, (req, res, next) => {
    login(req, res, next);
});

AuthRouter.post('/admin/login', authLimiter, (req, res, next) => {
    adminLogin(req, res, next);
});

AuthRouter.post('/user/login', authLimiter, (req, res, next) => {
    userLogin(req, res, next);
});

AuthRouter.post('/logout', authLimiter, (req, res, next) => {
    logout(req, res, next);
});

export default AuthRouter;