import express from 'express';
import validateRequest from '../../app/middleware/validateSchema';
import { followerValidation } from './follower.validation';
import { followerController } from './follower.controller';
import jwtAuth from '../../app/middleware/jwtAuth';

const router = express.Router();

router.post(
  '/create-follower',
  jwtAuth(),
  validateRequest(followerValidation.followingSchema),
  followerController.createFollower,
);

export const followingRouter = router;
