import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Comment text is required'],
        trim: true,
        maxlength: [1000, 'Comment must be less than 1000 characters'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required'],
    },
    issue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue',
        required: [true, 'Issue reference is required'],
        index: true,
    },
    // Reply functionality
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null,
    },
    // File attachments for comments
    attachments: [{
        filename: {
            type: String,
            required: true,
        },
        originalName: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        fileType: {
            type: String,
            enum: ['image', 'video', 'document'],
            required: true,
        },
        fileSize: {
            type: Number,
            required: true,
        },
    }],
    // Comment metadata
    isEdited: {
        type: Boolean,
        default: false,
    },
    editedAt: Date,
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
    // Reactions/Likes
    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        likedAt: {
            type: Date,
            default: Date.now,
        },
    }],
    likeCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

// Index for efficient queries
commentSchema.index({ issue: 1, createdAt: -1 });
commentSchema.index({ author: 1, createdAt: -1 });

const CommentModel = mongoose.model('Comment', commentSchema);

export default CommentModel;
