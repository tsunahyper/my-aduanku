import AnalyticsModel from '../issue-service/models/analytics.model.js';
import IssueModel from '../../issue-service/models/issues.model.js';
import UserModel from '../../user-service/models/user.model.js';
import CommentModel from '../issue-service/models/comment.model.js';

// Generate daily analytics
export const generateDailyAnalytics = async (date = new Date()) => {
    try {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // Check if analytics already exist for this date
        const existingAnalytics = await AnalyticsModel.findOne({
            date: startOfDay,
            period: 'daily'
        });

        if (existingAnalytics) {
            return existingAnalytics;
        }

        // Get issue statistics
        const issues = await IssueModel.find({
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });

        const issueStats = {
            total: issues.length,
            byCategory: {
                road: issues.filter(i => i.category === 'road').length,
                water: issues.filter(i => i.category === 'water').length,
                electricity: issues.filter(i => i.category === 'electricity').length,
                safety: issues.filter(i => i.category === 'safety').length,
                other: issues.filter(i => i.category === 'other').length,
            },
            byStatus: {
                reported: issues.filter(i => i.status === 'reported').length,
                in_review: issues.filter(i => i.status === 'in_review').length,
                assigned: issues.filter(i => i.status === 'assigned').length,
                resolved: issues.filter(i => i.status === 'resolved').length,
                archived: issues.filter(i => i.status === 'archived').length,
            },
            byPriority: {
                low: issues.filter(i => i.priority === 'low').length,
                medium: issues.filter(i => i.priority === 'medium').length,
                high: issues.filter(i => i.priority === 'high').length,
            }
        };

        // Calculate resolution time
        const resolvedIssues = issues.filter(i => i.status === 'resolved' && i.resolution?.resolvedAt);
        const resolutionTimes = resolvedIssues.map(issue => {
            return (issue.resolution.resolvedAt - issue.createdAt) / (1000 * 60 * 60); // in hours
        });

        const avgResolutionTime = resolutionTimes.length > 0 
            ? resolutionTimes.reduce((a, b) => a + b, 0) / resolutionTimes.length 
            : 0;

        const medianResolutionTime = resolutionTimes.length > 0
            ? resolutionTimes.sort((a, b) => a - b)[Math.floor(resolutionTimes.length / 2)]
            : 0;

        issueStats.resolutionTime = {
            average: Math.round(avgResolutionTime * 100) / 100,
            median: Math.round(medianResolutionTime * 100) / 100
        };

        // Get user statistics
        const totalUsers = await UserModel.countDocuments();
        const activeUsers = await UserModel.countDocuments({
            isActive: true
        });
        const newUsers = await UserModel.countDocuments({
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });

        // Get top reporters
        const topReporters = await UserModel.aggregate([
            {
                $lookup: {
                    from: 'issues',
                    localField: '_id',
                    foreignField: 'createdBy',
                    as: 'reportedIssues'
                }
            },
            {
                $match: {
                    'reportedIssues.createdAt': { $gte: startOfDay, $lte: endOfDay }
                }
            },
            {
                $project: {
                    userId: '$_id',
                    count: { $size: '$reportedIssues' }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        // Get engagement statistics
        const totalComments = await CommentModel.countDocuments({
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });

        const totalAttachments = issues.reduce((total, issue) => {
            return total + (issue.attachments ? issue.attachments.length : 0);
        }, 0);

        const satisfactionRatings = resolvedIssues
            .filter(issue => issue.resolution?.satisfactionRating)
            .map(issue => issue.resolution.satisfactionRating);

        const avgSatisfaction = satisfactionRatings.length > 0
            ? satisfactionRatings.reduce((a, b) => a + b, 0) / satisfactionRatings.length
            : 0;

        const analytics = await AnalyticsModel.create({
            date: startOfDay,
            period: 'daily',
            issues: issueStats,
            users: {
                total: totalUsers,
                active: activeUsers,
                newRegistrations: newUsers,
                topReporters: topReporters
            },
            engagement: {
                totalComments,
                totalAttachments,
                averageSatisfactionRating: Math.round(avgSatisfaction * 100) / 100
            }
        });

        return analytics;
    } catch (error) {
        console.error('Error generating daily analytics:', error);
        throw error;
    }
};

// Get analytics summary
export const getAnalyticsSummary = async (period = 'daily', limit = 30) => {
    try {
        const analytics = await AnalyticsModel.find({ period })
            .sort({ date: -1 })
            .limit(parseInt(limit));

        return analytics;
    } catch (error) {
        console.error('Error getting analytics summary:', error);
        throw error;
    }
};
