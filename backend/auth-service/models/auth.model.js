import mongoose from 'mongoose';

const blacklistedTokensSchema = new mongoose.Schema({
  token: { 
    type: String, 
    required: true, 
    unique: true 
    },
  reason: {
    type: String, 
    default: 'logout' 
    },
  expiresAt: { 
    type: Date, 
    required: true 
    }
}, { timestamps: true });

// auto-remove when expiresAt passes
blacklistedTokensSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
blacklistedTokensSchema.index({ token: 1 });

export default mongoose.model('BlacklistedToken', blacklistedTokensSchema);
