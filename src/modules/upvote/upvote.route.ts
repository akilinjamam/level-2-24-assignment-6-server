import express from 'express';
import jwtAuth from '../../app/middleware/jwtAuth';
import validateRequest from '../../app/middleware/validateSchema';
import { upvoteController } from './upvote.controller';
import { upvoteValidation } from './upvote.validation';

const router = express.Router();

router.post(
  '/create-upvote',
  jwtAuth(),
  validateRequest(upvoteValidation.upvoteSchema),
  upvoteController.createUpvote,
);
router.get('/', jwtAuth(), upvoteController.getUpvote);
router.post('/remove-upvote', jwtAuth(), upvoteController.removeUpvote);

export const upvoteRouter = router;
