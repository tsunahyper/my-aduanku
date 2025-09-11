import mongoose from 'mongoose';

const blacklistedTokensSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

// Auto-expire blacklisted tokens after 14 days (adjust as needed)
blacklistedTokensSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1209600 });

const BlacklistedTokenModel = mongoose.model('BlacklistedToken', blacklistedTokensSchema);

export default BlacklistedTokenModel;