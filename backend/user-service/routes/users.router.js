import { Router } from "express";
import {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    uploadAvatar,
    getProfile,
    updateProfile
} from "../controllers/user.controller.js";
import { authorize, authorize_admin, authorize_superadmin } from "../middlewares/auth.middleware.js";
import { uploadLimiter } from "../middlewares/rateLimit.middleware.js";
import { uploadToS3 } from "../utils/s3.js";

const UsersRouter = Router();

UsersRouter.get('/health', (req, res) => {
    res.status(200).json({ ok: true, service: 'user-service', time: new Date().toISOString() });
});

// Self profile
UsersRouter.get('/profile', authorize, (req, res, next) => getProfile(req, res, next));
UsersRouter.put('/profile', authorize, (req, res, next) => updateProfile(req, res, next));
UsersRouter.post('/profile/avatar',
    authorize,
    uploadLimiter,
    uploadToS3.single('avatar'),
    (req, res, next) => uploadAvatar(req, res, next)
);

// Admin
UsersRouter.get('/', authorize_admin, (req, res, next) => getUsers(req, res, next));
UsersRouter.get('/:id', authorize, (req, res, next) => getUser(req, res, next));
UsersRouter.put('/:id', authorize_admin, (req, res, next) => updateUser(req, res, next));

// Superadmin
UsersRouter.delete('/:id', authorize_superadmin, (req, res, next) => deleteUser(req, res, next));

export default UsersRouter;