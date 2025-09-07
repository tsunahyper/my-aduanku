import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, 'Date is required'],
        index: true,
    },
    period: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        required: [true, 'Period is required'],
    },
    // Issue statistics
    issues: {
        total: {
            type: Number,
            default: 0,
        },
        byCategory: {
            road: { type: Number, default: 0 },
            water: { type: Number, default: 0 },
            electricity: { type: Number, default: 0 },
            safety: { type: Number, default: 0 },
            other: { type: Number, default: 0 },
        },
        byStatus: {
            reported: { type: Number, default: 0 },
            in_review: { type: Number, default: 0 },
            assigned: { type: Number, default: 0 },
            resolved: { type: Number, default: 0 },
            archived: { type: Number, default: 0 },
        },
        byPriority: {
            low: { type: Number, default: 0 },
            medium: { type: Number, default: 0 },
            high: { type: Number, default: 0 },
        },
        resolutionTime: {
            average: { type: Number, default: 0 }, // in hours
            median: { type: Number, default: 0 },
        },
    },
    // User statistics
    users: {
        total: { type: Number, default: 0 },
        active: { type: Number, default: 0 },
        newRegistrations: { type: Number, default: 0 },
        topReporters: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            count: { type: Number, default: 0 },
        }],
    },
    // Engagement statistics
    engagement: {
        totalComments: { type: Number, default: 0 },
        totalAttachments: { type: Number, default: 0 },
        averageSatisfactionRating: { type: Number, default: 0 },
    },
}, {
    timestamps: true,
});

// Compound index for efficient queries
analyticsSchema.index({ date: -1, period: 1 });

const AnalyticsModel = mongoose.model('Analytics', analyticsSchema);

export default AnalyticsModel;
