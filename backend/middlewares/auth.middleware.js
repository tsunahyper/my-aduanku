import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
import BlacklistedTokenModel from '../models/auth.model.js';
import { UnauthorizedError, ForbiddenError } from '../utils/errors.js';

// Base authorization middleware
export const authorize = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            throw new UnauthorizedError('Access token is required');
        }

        // Check if token is blacklisted
        const existingToken = await BlacklistedTokenModel.findOne({ token, isActive: true });
        if (existingToken) {
            throw new UnauthorizedError('Token is blacklisted');
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id);

        if (!user) {
            throw new UnauthorizedError('User not found');
        }

        if (!user.isActive) {
            throw new UnauthorizedError('User account is deactivated');
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

// Admin authorization
export const authorize_admin = async (req, res, next) => {
    try {
        await authorize(req, res, () => {
            if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
                throw new ForbiddenError('Admin access required');
            }
            next();
        });
    } catch (error) {
        next(error);
    }
};

// Super admin authorization
export const authorize_superadmin = async (req, res, next) => {
    try {
        await authorize(req, res, () => {
            if (req.user.role !== 'superadmin') {
                throw new ForbiddenError('Super admin access required');
            }
            next();
        });
    } catch (error) {
        next(error);
    }
};

// Optional authorization (for public endpoints that can benefit from user context)
export const optional_authorize = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (token) {
            const existingToken = await BlacklistedTokenModel.findOne({ token });
            if (!existingToken) {
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    const user = await UserModel.findById(decoded.id);
                    if (user && user.isActive) {
                        req.user = user;
                    }
                } catch (error) {
                    // Token is invalid, but we continue without user context
                }
            }
        }

        next();
    } catch (error) {
        next(error);
    }
};

// Resource ownership check
export const checkResourceOwnership = (resourceModel, resourceIdParam = 'id', userIdField = 'createdBy') => {
    return async (req, res, next) => {
        try {
            const resourceId = req.params[resourceIdParam];
            const resource = await resourceModel.findById(resourceId);

            if (!resource) {
                throw new NotFoundError('Resource not found');
            }

            const isOwner = resource[userIdField].toString() === req.user._id.toString();
            const isAdmin = req.user.role === 'admin' || req.user.role === 'superadmin';

            if (!isOwner && !isAdmin) {
                throw new ForbiddenError('You are not authorized to access this resource');
            }

            req.resource = resource;
            next();
        } catch (error) {
            next(error);
        }
    };
};