import { Router } from "express";
import { 
    createComment, 
    getComments, 
    updateComment, 
    deleteComment,
    toggleCommentLike
} from "../controllers/comments.controller.js";
import { 
    authorize, 
    checkResourceOwnership
} from "../../middlewares/auth.middleware.js";
import { commentLimiter } from "../../middlewares/rateLimit.middleware.js";
import { uploadToS3 } from "../../utils/s3.js";
import CommentModel from "../models/comment.model.js";

const CommentRouter = Router();

// Get comments for an issue
CommentRouter.get('/issue/:issueId', authorize, getComments);

// Create comment
CommentRouter.post('/', 
    authorize, 
    commentLimiter,
    uploadToS3.array('attachments', 3),
    createComment
);

// Update comment
CommentRouter.put('/:id', 
    authorize, 
    checkResourceOwnership(CommentModel, 'id', 'author'),
    updateComment
);

// Delete comment
CommentRouter.delete('/:id', 
    authorize, 
    checkResourceOwnership(CommentModel, 'id', 'author'),
    deleteComment
);

// Like/unlike comment
CommentRouter.post('/:id/like', authorize, toggleCommentLike);

export default CommentRouter;
