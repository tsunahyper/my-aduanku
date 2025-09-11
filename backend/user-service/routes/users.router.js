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
import { 
    authorize, 
    authorize_admin, 
    authorize_superadmin
} from "../../middlewares/auth.middleware.js";
import { uploadLimiter } from "../../middlewares/rateLimit.middleware.js";
import { uploadToS3 } from "../../utils/s3.js";

const UsersRouter = Router();

// Protected routes
UsersRouter.get('/profile', authorize, getProfile);
UsersRouter.put('/profile', authorize, updateProfile);
UsersRouter.post('/profile/avatar', 
    authorize, 
    uploadLimiter,
    uploadToS3.single('avatar'),
    uploadAvatar
);

// Admin routes
UsersRouter.get('/', authorize_admin, getUsers);
UsersRouter.get('/:id', authorize, getUser);
UsersRouter.put('/:id', authorize_admin, updateUser);

// Super admin routes
UsersRouter.delete('/:id', authorize_superadmin, deleteUser);

export default UsersRouter;