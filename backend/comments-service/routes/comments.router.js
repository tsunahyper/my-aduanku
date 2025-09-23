import { Router } from "express";
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
  toggleCommentLike
} from "../controllers/comments.controller.js";
import { authorize, checkResourceOwnership } from "../middlewares/auth.middleware.js";
import { commentLimiter } from "../middlewares/rateLimit.middleware.js";
import { uploadToS3 } from "../utils/s3.js";
import CommentModel from "../models/comment.model.js";

const CommentRouter = Router();

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
