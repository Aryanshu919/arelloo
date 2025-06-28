import express from 'express';
import * as commentController from "../controllers/comment_controller"

const commentRouter = express.Router();

commentRouter.post('/', commentController.addCommentToCard);
commentRouter.get('/card/:id', commentController.getCommentsForCard);
commentRouter.put('/:id', commentController.updateComment);
commentRouter.delete('/:id', commentController.deleteComment);

export default commentRouter;