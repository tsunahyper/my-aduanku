import mongoose from 'mongoose';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    const { username, name, email, password, role } = req.body;
    
    try {
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'User already exists' 
            });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = await UserModel.create({ 
            username, 
            name, 
            email, 
            password: hashedPassword, 
            role: role || 'user' // Default to 'user' if no role provided
        });

        // Generate JWT token
        const token = jwt.sign(
            { id: newUser._id }, 
            'your-super-secret-jwt-key-change-this-in-production-12345'
        );

        res.status(201).json({ 
            success: true, 
            message: 'User Registered Successfully!', 
            data: { 
                token, 
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                }
            } 
        });

    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide both email and password' 
            });
        }

        const user = await UserModel.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }

        const token = jwt.sign(
            { id: user._id }, 
            'your-super-secret-jwt-key-change-this-in-production-12345'
        );

        // ✅ IMPROVED: Don't send password in response
        const userResponse = {
            id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            phone: user.phone,
            createdAt: user.createdAt
        };

        res.status(200).json({ 
            success: true, 
            message: 'User logged in successfully!', 
            data: { 
                token, 
                user: userResponse 
            } 
        });

    } catch (error) {
        next(error);
    }
};

export const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide both email and password' 
            });
        }

        const user = await UserModel.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        // Check if user has admin or superadmin role
        if (user.role !== 'admin' && user.role !== 'superadmin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin privileges required.'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            'your-super-secret-jwt-key-change-this-in-production-12345',
            { expiresIn: 900 } // 15 minutes
        );

        const userResponse = {
            id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            phone: user.phone,
            createdAt: user.createdAt
        };

        res.status(200).json({ 
            success: true, 
            message: 'Admin logged in successfully!', 
            data: { 
                token, 
                user: userResponse 
            } 
        });

    } catch (error) {
        next(error);
    }
};

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide both email and password' 
            });
        }

        const user = await UserModel.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if user has user role (not admin or superadmin)
        if (user.role === 'admin' || user.role === 'superadmin') {
            return res.status(403).json({
                success: false,
                message: 'Please use admin login for admin accounts.'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            'your-super-secret-jwt-key-change-this-in-production-12345',
            { expiresIn: 3600 } // 1 hour for regular users
        );

        const userResponse = {
            id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            phone: user.phone,
            createdAt: user.createdAt
        };

        res.status(200).json({ 
            success: true, 
            message: 'User logged in successfully!', 
            data: { 
                token, 
                user: userResponse 
            } 
        });

    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        const h = req.headers.authorization || '';
        if (!h.startsWith('Bearer ')) {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing token' 
            });
        }
        
        const token = h.split(' ')[1];

        // Import BlacklistedToken model at the top if not already imported
        // import BlacklistedToken from '../models/blacklistedToken.model.js';

        // Prevent duplicate insert (optional)
        const exists = await BlacklistedToken.findOne({ token }).lean();
        if (exists) {
            return res.status(400).json({ 
                success: false, 
                message: 'Token is already blacklisted' 
            });
        }

        const decoded = jwt.decode(token);
        const expMs = decoded?.exp ? decoded.exp * 1000 : (Date.now() + 7*24*60*60*1000);

        await BlacklistedToken.create({ 
            token, 
            reason: 'logout', 
            expiresAt: new Date(expMs) 
        });

        res.status(200).json({ 
            success: true, 
            message: 'User logged out successfully!' 
        });
    } catch (err) {
        next(err);
    }
};