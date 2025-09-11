import CommentModel from '../models/comment.model.js';
import IssueModel from '../../issue-service/models/issues.model.js';
import UserModel from '../../user-service/models/user.model.js';
import { BadRequestError, NotFoundError, ForbiddenError } from '../../utils/errors.js';
import { uploadToS3, deleteFromS3 } from '../../utils/s3.js';

// Create a new comment
export const createComment = async (req, res, next) => {
    try {
        const { text, parentComment, issueId } = req.body;

        if (!text || !issueId) {
            throw new BadRequestError('Text and issueId are required');
        }

        // Check if issue exists
        const issue = await IssueModel.findById(issueId);
        if (!issue) {
            throw new NotFoundError('Issue not found');
        }

        const commentData = {
            text,
            author: req.user._id,
            issue: issueId,
            parentComment: parentComment || null
        };

        // Handle file attachments if any
        if (req.files && req.files.length > 0) {
            const attachments = req.files.map(file => ({
                filename: file.key,
                originalName: file.originalname,
                url: file.location,
                fileType: file.mimetype.startsWith('image/') ? 'image' : 
                         file.mimetype.startsWith('video/') ? 'video' : 'document',
                fileSize: file.size
            }));
            commentData.attachments = attachments;
        }

        const comment = await CommentModel.create(commentData);

        const populatedComment = await CommentModel.findById(comment._id)
            .populate('author', 'name username avatar')
            .populate('parentComment');

        res.status(201).json({
            success: true,
            message: 'Comment created successfully',
            data: populatedComment
        });
    } catch (error) {
        next(error);
    }
};

// Get comments for an issue
export const getComments = async (req, res, next) => {
    try {
        const { issueId } = req.params;
        const { page = 1, limit = 20 } = req.query;

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const comments = await CommentModel.find({ 
            issue: issueId,
            isDeleted: false 
        })
        .populate('author', 'name username avatar')
        .populate('parentComment')
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(parseInt(limit));

        const total = await CommentModel.countDocuments({ 
            issue: issueId,
            isDeleted: false 
        });

        res.status(200).json({
            success: true,
            data: {
                comments,
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

// Update a comment
export const updateComment = async (req, res, next) => {
    try {
        const { text } = req.body;
        const comment = await CommentModel.findById(req.params.id);

        if (!comment) {
            throw new NotFoundError('Comment not found');
        }

        // Check permissions
        if (comment.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            throw new ForbiddenError('You are not authorized to update this comment');
        }

        const updatedComment = await CommentModel.findByIdAndUpdate(
            req.params.id,
            { 
                text,
                isEdited: true,
                editedAt: new Date()
            },
            { new: true }
        ).populate('author', 'name username avatar');

        res.status(200).json({
            success: true,
            message: 'Comment updated successfully',
            data: updatedComment
        });
    } catch (error) {
        next(error);
    }
};

// Delete a comment
export const deleteComment = async (req, res, next) => {
    try {
        const comment = await CommentModel.findById(req.params.id);

        if (!comment) {
            throw new NotFoundError('Comment not found');
        }

        // Check permissions
        if (comment.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            throw new ForbiddenError('You are not authorized to delete this comment');
        }

        // Soft delete
        await CommentModel.findByIdAndUpdate(req.params.id, {
            isDeleted: true,
            deletedAt: new Date()
        });

        res.status(200).json({
            success: true,
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Like/unlike a comment
export const toggleCommentLike = async (req, res, next) => {
    try {
        const comment = await CommentModel.findById(req.params.id);

        if (!comment) {
            throw new NotFoundError('Comment not found');
        }

        const existingLike = comment.likes.find(
            like => like.user.toString() === req.user._id.toString()
        );

        let updatedComment;

        if (existingLike) {
            // Unlike
            updatedComment = await CommentModel.findByIdAndUpdate(
                req.params.id,
                {
                    $pull: { likes: { user: req.user._id } },
                    $inc: { likeCount: -1 }
                },
                { new: true }
            );
        } else {
            // Like
            updatedComment = await CommentModel.findByIdAndUpdate(
                req.params.id,
                {
                    $push: { likes: { user: req.user._id } },
                    $inc: { likeCount: 1 }
                },
                { new: true }
            );
        }

        res.status(200).json({
            success: true,
            message: existingLike ? 'Comment unliked' : 'Comment liked',
            data: {
                likeCount: updatedComment.likeCount,
                isLiked: !existingLike
            }
        });
    } catch (error) {
        next(error);
    }
};
