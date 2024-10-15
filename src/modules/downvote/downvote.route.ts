import express from 'express';
import jwtAuth from '../../app/middleware/jwtAuth';
import validateRequest from '../../app/middleware/validateSchema';

import { downvoteValidation } from './downvote.validation';
import { downvoteController } from './downvote.controller';

const router = express.Router();

router.post(
  '/create-downvote',
  jwtAuth(),
  validateRequest(downvoteValidation.downvoteSchema),
  downvoteController.createDownvote,
);
router.get('/', jwtAuth(), downvoteController.getDownvote);
router.post('/remove-downvote', jwtAuth(), downvoteController.removeDownvote);

export const downvoteRouter = router;
