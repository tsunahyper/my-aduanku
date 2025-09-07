import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";

const AuthRouter = Router();

AuthRouter.post('/register', (req, res, next) => {
    register(req, res, next);
});

AuthRouter.post('/login', (req, res, next) => {
    login(req, res, next);
});

AuthRouter.post('/logout', (req, res, next) => {
    logout(req, res, next);
});

export default AuthRouter;
