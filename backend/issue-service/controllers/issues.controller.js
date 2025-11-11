import IssueModel from '../models/issues.model.js';
import CommentModel from '../models/comment.model.js';
import UserModel from '../models/user.model.js';
import { BadRequestError, NotFoundError, ForbiddenError } from '../utils/errors.js';
import { uploadToS3, deleteFromS3 } from '../utils/s3.js';

// Create a new issue
export const createIssue = async (req, res, next) => {
    try {
        const {
            title,
            description,
            category,
            tags = [],
            priority = 'medium',
            location,
            isPublic = true,
            isAnonymous = false
        } = req.body;

        // Validate required fields
        if (!title || !description || !category || !location?.coordinates) {
            throw new BadRequestError('Missing required fields: title, description, category, and location coordinates');
        }

        // Create the issue
        const issueData = {
            title,
            description,
            category,
            tags,
            priority,
            location,
            isPublic,
            isAnonymous,
            createdBy: req.user._id,
            assignedTo: req.user._id,
            timeline: [{
                status: 'reported',
                changedBy: req.user._id,
                note: 'Issue reported and auto-assigned to creator'
            }]
        };

        const issue = await IssueModel.create(issueData);

        // Populate the created issue
        const populatedIssue = await IssueModel.findById(issue._id)
            .populate('createdBy', 'name username avatar')
            .populate('assignedTo', 'name username avatar');

        res.status(201).json({
            success: true,
            message: 'Issue created successfully',
            data: populatedIssue,
        });
    } catch (error) {
        next(error);
    }
};

// Get all issues with advanced filtering and pagination
export const getIssues = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            category,
            status,
            priority,
            assignedTo,
            createdBy,
            search,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            near,
            radius = 10000 // 10km default radius
        } = req.query;

        // Build filter object
        const filter = {};

        if (category) filter.category = category;
        if (status) filter.status = status;
        if (priority) filter.priority = priority;
        if (assignedTo) filter.assignedTo = assignedTo;
        if (createdBy) filter.createdBy = createdBy;
        if (search) {
            filter.$text = { $search: search };
        }

        // Handle geospatial queries
        if (near) {
            const [lng, lat] = near.split(',').map(Number);
            if (lng && lat) {
                filter['location.coordinates'] = {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [lng, lat]
                        },
                        $maxDistance: parseInt(radius)
                    }
                };
            }
        }

        // Build sort object
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Execute query
        const issues = await IssueModel.find(filter)
            .populate('createdBy', 'name username avatar')
            .populate('assignedTo', 'name username avatar')
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit))
            .lean();

        // Get total count for pagination
        const total = await IssueModel.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: {
                issues,
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

// Get a single issue with comments
export const getIssue = async (req, res, next) => {
    try {
        const issue = await IssueModel.findById(req.params.id)
            .populate('createdBy', 'name username avatar')
            .populate('assignedTo', 'name username avatar')
            .populate('attachments.uploadedBy', 'name username');

        if (!issue) {
            throw new NotFoundError('Issue not found');
        }

        // Get comments for this issue
        const comments = await CommentModel.find({ 
            issue: req.params.id,
            isDeleted: false 
        })
            .populate('author', 'name username avatar')
            .populate('parentComment')
            .sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            data: {
                issue,
                comments
            }
        });
    } catch (error) {
        next(error);
    }
};

// Update an issue
export const updateIssue = async (req, res, next) => {
    try {
        const issue = await IssueModel.findById(req.params.id);
        
        if (!issue) {
            throw new NotFoundError('Issue not found');
        }

        // Check permissions
        const canUpdate = req.user.role === 'superadmin' || 
                         req.user.role === 'admin' || 
                         issue.createdBy.toString() === req.user._id.toString();

        if (!canUpdate) {
            throw new ForbiddenError('You are not authorized to update this issue');
        }

        const updateData = { ...req.body };

        // Handle status changes
        if (req.body.status && req.body.status !== issue.status) {
            updateData.timeline = [
                ...issue.timeline,
                {
                    status: req.body.status,
                    changedBy: req.user._id,
                    note: req.body.statusNote || `Status changed to ${req.body.status}`
                }
            ];

            // Handle resolution tracking
            if (req.body.status === 'resolved') {
                updateData.resolution = {
                    resolvedAt: new Date(),
                    resolvedBy: req.user._id,
                    resolutionNote: req.body.resolutionNote || 'Issue marked as resolved'
                };
            }
        }

        const updatedIssue = await IssueModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).populate('createdBy', 'name username avatar')
         .populate('assignedTo', 'name username avatar');

        res.status(200).json({
            success: true,
            message: 'Issue updated successfully',
            data: updatedIssue
        });
    } catch (error) {
        next(error);
    }
};

// Delete an issue
export const deleteIssue = async (req, res, next) => {
    try {
        const issue = await IssueModel.findById(req.params.id);
        
        if (!issue) {
            throw new NotFoundError('Issue not found');
        }

        // Check permissions
        const canDelete = req.user.role === 'superadmin' || 
                         issue.createdBy.toString() === req.user._id.toString();

        if (!canDelete) {
            throw new ForbiddenError('You are not authorized to delete this issue');
        }

        // Delete associated files from S3
        if (issue.attachments && issue.attachments.length > 0) {
            for (const attachment of issue.attachments) {
                await deleteFromS3(attachment.filename);
            }
        }

        await IssueModel.findByIdAndDelete(req.params.id);
        
        res.status(200).json({
            success: true,
            message: 'Issue deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Upload attachments to an issue
export const uploadAttachments = async (req, res, next) => {
    try {
        const issue = await IssueModel.findById(req.params.id);
        
        if (!issue) {
            throw new NotFoundError('Issue not found');
        }

        if (!req.files || req.files.length === 0) {
            throw new BadRequestError('No files uploaded');
        }

        const attachments = [];

        for (const file of req.files) {
            const attachment = {
                filename: file.key,
                originalName: file.originalname,
                url: file.location,
                fileType: file.mimetype.startsWith('image/') ? 'image' : 
                         file.mimetype.startsWith('video/') ? 'video' : 'document',
                fileSize: file.size,
                uploadedBy: req.user._id,
                uploadedAt: new Date()
            };
            attachments.push(attachment);
        }

        const updatedIssue = await IssueModel.findByIdAndUpdate(
            req.params.id,
            { $push: { attachments: { $each: attachments } } },
            { new: true }
        ).populate('attachments.uploadedBy', 'name username');

        res.status(200).json({
            success: true,
            message: 'Attachments uploaded successfully',
            data: updatedIssue.attachments
        });
    } catch (error) {
        next(error);
    }
};

// Assign issue to a user
export const assignIssue = async (req, res, next) => {
    try {
        const { assignedTo } = req.body;
        
        if (!assignedTo) {
            throw new BadRequestError('assignedTo field is required');
        }

        const issue = await IssueModel.findById(req.params.id);
        
        if (!issue) {
            throw new NotFoundError('Issue not found');
        }

        // Check if assigned user exists
        const assignedUser = await UserModel.findById(assignedTo);
        if (!assignedUser) {
            throw new NotFoundError('Assigned user not found');
        }

        const updatedIssue = await IssueModel.findByIdAndUpdate(
            req.params.id,
            { 
                assignedTo,
                status: 'assigned',
                timeline: [
                    ...issue.timeline,
                    {
                        status: 'assigned',
                        changedBy: req.user._id,
                        note: `Issue assigned to ${assignedUser.name}`
                    }
                ]
            },
            { new: true }
        ).populate('createdBy', 'name username avatar')
         .populate('assignedTo', 'name username avatar');

        res.status(200).json({
            success: true,
            message: 'Issue assigned successfully',
            data: updatedIssue
        });
    } catch (error) {
        next(error);
    }
};

// Get issues near a location
export const getIssuesNearLocation = async (req, res, next) => {
    try {
        const { lng, lat, radius = 10000 } = req.query;

        if (!lng || !lat) {
            throw new BadRequestError('Longitude and latitude are required');
        }

        const issues = await IssueModel.find({
            'location.coordinates': {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(lng), parseFloat(lat)]
                    },
                    $maxDistance: parseInt(radius)
                }
            }
        })
        .populate('createdBy', 'name username avatar')
        .populate('assignedTo', 'name username avatar')
        .limit(50);

        res.status(200).json({
            success: true,
            data: issues
        });
    } catch (error) {
        next(error);
    }
};