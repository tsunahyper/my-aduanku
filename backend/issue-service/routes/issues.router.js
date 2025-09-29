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
} from "../middlewares/auth.middleware.js";
import { uploadLimiter, generalLimiter } from "../middlewares/rateLimit.middleware.js";
import { uploadToS3 } from "../utils/s3.js";
import IssueModel from "../models/issues.model.js";

const IssueRouter = Router();

IssueRouter.get('/health', (req, res) => {
  res.status(200).json({ ok: true, service: 'issue-service', time: new Date().toISOString() });
});

// Public (read) – apply general limiter
IssueRouter.get('/near', generalLimiter, (req, res, next) => {
  getIssuesNearLocation(req, res, next);
});

// Protected reads – apply general limiter
IssueRouter.get('/', authorize, generalLimiter, (req, res, next) => {
  getIssues(req, res, next);
});
IssueRouter.get('/:id', authorize, generalLimiter, (req, res, next) => {
  getIssue(req, res, next);
});

// Create
IssueRouter.post('/', authorize, (req, res, next) => {
  createIssue(req, res, next);
});

// File uploads – upload limiter + S3
IssueRouter.post('/:id/attachments',
  authorize,
  uploadLimiter,
  uploadToS3.array('attachments', 5),
  (req, res, next) => uploadAttachments(req, res, next)
);

// Update (owner or admin handled by controller; for strict ownership use createdBy)
IssueRouter.put('/:id',
  authorize,
  checkResourceOwnership(IssueModel, 'id', 'createdBy'),
  (req, res, next) => updateIssue(req, res, next)
);

// Assign (admin)
IssueRouter.put('/:id/assign',
  authorize_admin,
  (req, res, next) => assignIssue(req, res, next)
);

// Delete (superadmin)
IssueRouter.delete('/:id',
  authorize_superadmin,
  (req, res, next) => deleteIssue(req, res, next)
);

export default IssueRouter;