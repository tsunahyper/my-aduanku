import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title must be less than 200 characters'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [2000, 'Description must be less than 2000 characters'],
    },
    category: {
        type: String,
        enum: ['road', 'water', 'electricity', 'safety', 'other'],
        required: [true, 'Category is required'],
        index: true,
    },
    tags: [{
        type: String,
        trim: true,
        maxlength: [50, 'Tag must be less than 50 characters'],
    }],
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
        index: true,
    },
    status: {
        type: String,
        enum: ['reported', 'in_review', 'assigned', 'resolved', 'archived'],
        default: 'reported',
        index: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Created by is required'],
        index: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
    },
    // Enhanced location with GeoJSON
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: [true, 'Location coordinates are required'],
            validate: {
                validator: function(coords) {
                    return coords.length === 2 && 
                           coords[0] >= -180 && coords[0] <= 180 && 
                           coords[1] >= -90 && coords[1] <= 90;
                },
                message: 'Invalid coordinates format. Must be [longitude, latitude]',
            },
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
    },
    // File attachments
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
            type: Number, // in bytes
            required: true,
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        uploadedAt: {
            type: Date,
            default: Date.now,
        },
    }],
    // Timeline tracking
    timeline: [{
        status: {
            type: String,
            enum: ['reported', 'in_review', 'assigned', 'resolved', 'archived'],
            required: true,
        },
        changedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        changedAt: {
            type: Date,
            default: Date.now,
        },
        note: String,
    }],
    // Resolution details
    resolution: {
        resolvedAt: Date,
        resolvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        resolutionNote: String,
        satisfactionRating: {
            type: Number,
            min: 1,
            max: 5,
        },
    },
    // Visibility and privacy
    isPublic: {
        type: Boolean,
        default: true,
    },
    isAnonymous: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

// Create 2dsphere index for geospatial queries
issueSchema.index({ 'location.coordinates': '2dsphere' });

// Compound indexes for efficient queries
issueSchema.index({ category: 1, status: 1 });
issueSchema.index({ priority: 1, status: 1 });
issueSchema.index({ createdBy: 1, status: 1 });
issueSchema.index({ assignedTo: 1, status: 1 });

// Text index for search functionality
issueSchema.index({ 
    title: 'text', 
    description: 'text', 
    tags: 'text' 
});

const IssueModel = mongoose.model('Issue', issueSchema);

export default IssueModel;