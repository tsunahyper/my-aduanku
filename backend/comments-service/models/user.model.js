import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: [true, 'Username must be unique'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name must be less than 50 characters long'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: [true, 'Email must be unique'],
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'user',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    area: {
        type: String, // e.g. "Kuala Lumpur", "Selangor"
    },
    categoriesHandled: [
        { type: String, enum: ['road', 'water', 'electricity', 'safety', 'other'] }
    ],
    // Profile enhancement
    avatar: {
        type: String, // URL to avatar image
    },
    phone: {
        type: String,
        match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'],
    },
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: {
            type: String,
            default: 'Malaysia',
        },
    },
}, {
    timestamps: true,
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;