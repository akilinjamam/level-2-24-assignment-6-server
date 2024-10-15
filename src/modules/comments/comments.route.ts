import express from 'express';
import jwtAuth from '../../app/middleware/jwtAuth';
import validateRequest from '../../app/middleware/validateSchema';
import { commentController } from './comments.controller';
import { commentValidation } from './comments.validation';

const router = express.Router();

router.post(
  '/create-comment',
  jwtAuth(),
  validateRequest(commentValidation.commentSchema),
  commentController.createComment,
);

router.get('/', jwtAuth(), commentController.getComment);

router.patch('/:id', jwtAuth(), commentController.updateComment);

router.delete('/:id', jwtAuth(), commentController.deleteComment);

export const commentRouter = router;
