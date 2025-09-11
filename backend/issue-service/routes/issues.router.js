import { Router } from "express";
import { 
    createIssue, 
    getIssues, 
    getIssue, 
    updateIssue, 
    deleteIssue,
    uploadAttachments,
    assignIssue,
    getIssuesNearLocation
} from "../controllers/issues.controller.js";
import { 
    authorize, 
    authorize_admin, 
    authorize_superadmin,
    checkResourceOwnership
} from "../../middlewares/auth.middleware.js";
import { uploadLimiter } from "../../middlewares/rateLimit.middleware.js";
import { uploadToS3 } from "../../utils/s3.js";
import IssueModel from "../models/issues.model.js";

const IssueRouter = Router();

// Public routes
IssueRouter.get('/near', getIssuesNearLocation);

// Protected routes
IssueRouter.get('/', authorize, getIssues);
IssueRouter.get('/:id', authorize, getIssue);
IssueRouter.post('/', authorize, createIssue);

// File upload routes
IssueRouter.post('/:id/attachments', 
    authorize, 
    uploadLimiter,
    uploadToS3.array('attachments', 5),
    uploadAttachments
);

// Admin routes
IssueRouter.put('/:id', 
    authorize, 
    checkResourceOwnership(IssueModel),
    updateIssue
);

IssueRouter.put('/:id/assign', 
    authorize_admin, 
    assignIssue
);

// Super admin routes
IssueRouter.delete('/:id', 
    authorize_superadmin, 
    deleteIssue
);

export default IssueRouter;