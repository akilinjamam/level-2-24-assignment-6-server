import express from 'express';
import validateRequest from '../../app/middleware/validateSchema';
import { postsValidation } from './posts.validation';
import jwtAuth from '../../app/middleware/jwtAuth';
import { postsController } from './posts.controller';

const router = express.Router();

router.post(
  '/create-posts',
  jwtAuth(),
  validateRequest(postsValidation.postsSchema),
  postsController.createPosts,
);

router.get('/', jwtAuth(), postsController.getPosts);

export const postsRouter = router;
