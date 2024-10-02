import express from 'express';
import validateRequest from '../../app/middleware/validateSchema';
import registrationSchema from './registration.validation';
import { userController } from './registration.controller';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(registrationSchema),
  userController.createUser,
);

export const userRouter = router;
