import UserModel from '../models/user.model.js';
import IssueModel from '../models/issues.model.js';
import { BadRequestError, NotFoundError, ForbiddenError } from '../utils/errors.js';

// Get all users with pagination and filtering
export const getUsers = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            role,
            isActive,
            search,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;

        const filter = {};
        if (role) filter.role = role;
        if (isActive !== undefined) filter.isActive = isActive === 'true';
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { username: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const users = await UserModel.find(filter)
            .select('-password')
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await UserModel.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: {
                users,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / parseInt(limit)),
                    totalItems: total,
                    itemsPerPage: parseInt(limit)
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get user profile with statistics
export const getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        
        // Validate MongoDB ObjectId format to prevent query parameter confusion
        if (!userId || !/^[0-9a-fA-F]{24}$/.test(userId)) {
            throw new BadRequestError('Invalid user ID format');
        }
        
        // Check permissions
        if (req.user._id.toString() !== userId && req.user.role !== 'admin' && req.user.role !== 'superadmin') {
            throw new ForbiddenError('You are not authorized to access this resource');
        }

        const user = await UserModel.findById(userId).select('-password');
        if (!user) {
            throw new NotFoundError('User not found');
        }

        // Get user statistics
        const [reportedIssues, assignedIssues, resolvedIssues] = await Promise.all([
            IssueModel.countDocuments({ createdBy: userId }),
            IssueModel.countDocuments({ assignedTo: userId }),
            IssueModel.countDocuments({ assignedTo: userId, status: 'resolved' })
        ]);

        res.status(200).json({
            success: true,
            data: {
                user,
                statistics: {
                    reportedIssues,
                    assignedIssues,
                    resolvedIssues
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// Update user profile
export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        
        // Check permissions
        if (req.user._id.toString() !== userId && req.user.role !== 'admin' && req.user.role !== 'superadmin') {
            throw new ForbiddenError('You are not authorized to update this user');
        }

        const allowedUpdates = ['name', 'username', 'email', 'phone', 'address', 'area', 'categoriesHandled'];
        
        // Only admins can update role and isActive
        if (req.user.role === 'admin' || req.user.role === 'superadmin') {
            allowedUpdates.push('role', 'isActive');
        }

        const updateData = {};
        Object.keys(req.body).forEach(key => {
            if (allowedUpdates.includes(key)) {
                updateData[key] = req.body[key];
            }
        });

        const user = await UserModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            throw new NotFoundError('User not found');
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// Delete user
export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        
        // Check permissions
        if (req.user._id.toString() !== userId && req.user.role !== 'superadmin') {
            throw new ForbiddenError('You are not authorized to delete this user');
        }

        const user = await UserModel.findByIdAndDelete(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Upload user avatar
export const uploadAvatar = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new BadRequestError('No file uploaded');
        }

        const user = await UserModel.findByIdAndUpdate(
            req.user._id,
            { avatar: req.file.location },
            { new: true }
        ).select('-password');

        res.status(200).json({
            success: true,
            message: 'Avatar uploaded successfully',
            data: { avatar: user.avatar }
        });
    } catch (error) {
        next(error);
    }
};

// Get user's own profile
export const getProfile = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user._id).select('-password');
        
        // Get user statistics
        const [reportedIssues, assignedIssues, resolvedIssues] = await Promise.all([
            IssueModel.countDocuments({ createdBy: req.user._id }),
            IssueModel.countDocuments({ assignedTo: req.user._id }),
            IssueModel.countDocuments({ assignedTo: req.user._id, status: 'resolved' })
        ]);

        res.status(200).json({
            success: true,
            data: {
                user,
                statistics: {
                    reportedIssues,
                    assignedIssues,
                    resolvedIssues
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// Update user's own profile
export const updateProfile = async (req, res, next) => {
    try {
        const allowedUpdates = ['name', 'username', 'email', 'phone', 'address', 'area'];
        
        const updateData = {};
        Object.keys(req.body).forEach(key => {
            if (allowedUpdates.includes(key)) {
                updateData[key] = req.body[key];
            }
        });

        const user = await UserModel.findByIdAndUpdate(
            req.user._id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
};