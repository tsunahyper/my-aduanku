import { generateDailyAnalytics, getAnalyticsSummary } from '../utils/analytics.js';
import IssueModel from '../models/issues.model.js';
import UserModel from '../models/user.model.js';
import CommentModel from '../models/comment.model.js';
import { ForbiddenError, BadRequestError } from '../utils/errors.js';

// Get analytics dashboard data
export const getAnalyticsDashboard = async (req, res, next) => {
    try {
        // Only superadmin can access analytics
        if (req.user.role !== 'superadmin') {
            throw new ForbiddenError('Only superadmin can access analytics');
        }

        const { period = 'daily', limit = 30 } = req.query;

        // Get analytics summary
        const analytics = await getAnalyticsSummary(period, parseInt(limit));

        // Get current statistics
        const [
            totalIssues,
            totalUsers,
            totalComments,
            issuesByCategory,
            issuesByStatus,
            issuesByPriority,
            topReporters,
            recentIssues
        ] = await Promise.all([
            IssueModel.countDocuments(),
            UserModel.countDocuments(),
            CommentModel.countDocuments(),
            IssueModel.aggregate([
                { $group: { _id: '$category', count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]),
            IssueModel.aggregate([
                { $group: { _id: '$status', count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]),
            IssueModel.aggregate([
                { $group: { _id: '$priority', count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]),
            UserModel.aggregate([
                {
                    $lookup: {
                        from: 'issues',
                        localField: '_id',
                        foreignField: 'createdBy',
                        as: 'reportedIssues'
                    }
                },
                {
                    $project: {
                        name: 1,
                        username: 1,
                        avatar: 1,
                        issuesReported: { $size: '$reportedIssues' }
                    }
                },
                { $sort: { issuesReported: -1 } },
                { $limit: 10 }
            ]),
            IssueModel.find()
                .populate('createdBy', 'name username avatar')
                .populate('assignedTo', 'name username avatar')
                .sort({ createdAt: -1 })
                .limit(10)
        ]);

        res.status(200).json({
            success: true,
            data: {
                summary: {
                    totalIssues,
                    totalUsers,
                    totalComments
                },
                analytics,
                charts: {
                    issuesByCategory,
                    issuesByStatus,
                    issuesByPriority
                },
                topReporters,
                recentIssues
            }
        });
    } catch (error) {
        next(error);
    }
};

// Generate analytics for a specific date
export const generateAnalytics = async (req, res, next) => {
    try {
        if (req.user.role !== 'superadmin') {
            throw new ForbiddenError('Only superadmin can generate analytics');
        }

        const { date } = req.body;
        
        if (!date) {
            throw new BadRequestError('Date is required');
        }

        const analytics = await generateDailyAnalytics(new Date(date));

        res.status(200).json({
            success: true,
            message: 'Analytics generated successfully',
            data: analytics
        });
    } catch (error) {
        next(error);
    }
};

// Get issues statistics
export const getIssuesStatistics = async (req, res, next) => {
    try {
        if (req.user.role !== 'superadmin' && req.user.role !== 'admin') {
            throw new ForbiddenError('Only admin and superadmin can access statistics');
        }

        const { startDate, endDate, groupBy = 'category' } = req.query;

        let matchQuery = {};
        if (startDate && endDate) {
            matchQuery.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const statistics = await IssueModel.aggregate([
            { $match: matchQuery },
            {
                $group: {
                    _id: `$${groupBy}`,
                    count: { $sum: 1 },
                    avgResolutionTime: {
                        $avg: {
                            $cond: [
                                { $and: [
                                    { $eq: ['$status', 'resolved'] },
                                    { $ne: ['$resolution.resolvedAt', null] }
                                ]},
                                {
                                    $divide: [
                                        { $subtract: ['$resolution.resolvedAt', '$createdAt'] },
                                        1000 * 60 * 60 // Convert to hours
                                    ]
                                },
                                null
                            ]
                        }
                    }
                }
            },
            { $sort: { count: -1 } }
        ]);

        res.status(200).json({
            success: true,
            data: statistics
        });
    } catch (error) {
        next(error);
    }
};
