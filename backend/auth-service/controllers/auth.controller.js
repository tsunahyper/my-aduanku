import mongoose from 'mongoose';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import BlacklistedTokenModel from '../models/auth.model.js';

export const register = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { username, name, email, password, role } = req.body;
    
    try {
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        
        if (existingUser) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10); // Method to generate a salt for the password
        const hashedPassword = await bcrypt.hash(password, salt); // Method to hash the password
        const newUsers = await UserModel.create([{ username, name, email, password: hashedPassword, role }], { session });

        const token = jwt.sign({ id: newUsers[0]._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY }); // Method to generate a JWT token for the user
        res.status(201).json({ success: true, message: 'User Registered Successfully!', data: { token, user: newUsers[0] } }); // Method to send the response to the client
        
        await session.commitTransaction();
        session.endSession();

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email && !password) {
            return res.status(400).json({ success: false, message: 'Please provide email or password' });
        }

        const user = await UserModel.findOne({ email }).select('+password');
        
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error('Invalid password.');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
        res.status(200).json({ success: true, message: 'User logged in successfully!', data: { token, user } });

    } catch (error) {
        next(error);
    }
};      

export const logout = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const existingToken = await BlacklistedTokenModel.findOne({ token });
        if (existingToken) {
            return res.status(400).json({ success: false, message: 'Token is blacklisted' });
        }
        await BlacklistedTokenModel.create({ token });
        res.status(200).json({ success: true, message: 'User logged out successfully!' });
    } catch (error) {
        next(error);
    }
};