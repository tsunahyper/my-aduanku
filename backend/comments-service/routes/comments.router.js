import { Router } from "express";
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
  toggleCommentLike,
  getCommentStats,
  getUserIssueComments
} from "../controllers/comments.controller.js";
import { authorize, checkResourceOwnership } from "../middlewares/auth.middleware.js";
import { commentLimiter } from "../middlewares/rateLimit.middleware.js";
import { uploadToS3 } from "../utils/s3.js";
import CommentModel from "../models/comment.model.js";

const CommentRouter = Router();

CommentRouter.get('/health', (req, res) => {
  res.status(200).json({ ok: true, service: 'comment-service', time: new Date().toISOString() });
});

// Get comment statistics
CommentRouter.get('/stats', authorize, (req, res, next) => {
  getCommentStats(req, res, next);
});

// Get all comments for user's issues
CommentRouter.get('/my-issues', authorize, (req, res, next) => {
  getUserIssueComments(req, res, next);
});

// Get comments for an issue
CommentRouter.get('/issue/:issueId', authorize, (req, res, next) => {
  getComments(req, res, next);
});

// Create comment
CommentRouter.post('/',
  authorize,
  commentLimiter,
  uploadToS3.array('attachments', 3),
  (req, res, next) => createComment(req, res, next)
);

// Update comment
CommentRouter.put('/:id',
  authorize,
  checkResourceOwnership(CommentModel, 'id', 'author'),
  (req, res, next) => updateComment(req, res, next)
);

// Delete comment
CommentRouter.delete('/:id',
  authorize,
  checkResourceOwnership(CommentModel, 'id', 'author'),
  (req, res, next) => deleteComment(req, res, next)
);

// Like/unlike
CommentRouter.post('/:id/like', authorize, (req, res, next) => {
  toggleCommentLike(req, res, next);
});

export default CommentRouter;
