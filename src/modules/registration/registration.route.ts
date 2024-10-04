import express from 'express';
import validateRequest from '../../app/middleware/validateSchema';

import { userController } from './registration.controller';
import { registerSchema } from './registration.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(registerSchema.registrationSchema),
  userController.createUser,
);

router.post(
  '/user-login',
  validateRequest(registerSchema.loginSchema),
  userController.createUserLogin,
);

router.post(
  '/change-password',
  validateRequest(registerSchema.changePasswordSchema),
  userController.changePassword,
);
router.post(
  '/password-recovery',
  validateRequest(registerSchema.passwordRecoverySchema),
  userController.passwordRecovery,
);
router.post(
  '/send-recovery-password',
  validateRequest(registerSchema.sendRecoveryPasswordSchema),
  userController.sendRecoveryPassword,
);

export const userRouter = router;
