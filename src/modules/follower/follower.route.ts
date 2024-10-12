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
router.get('/', jwtAuth(), followerController.getFollow);
router.post('/remove-follow', jwtAuth(), followerController.removeFollow);

export const followingRouter = router;
