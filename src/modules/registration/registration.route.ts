import express from 'express';
import validateRequest from '../../app/middleware/validateSchema';

import { userController } from './registration.controller';
import { registerSchema } from './registration.validation';
import { upload } from '../../app/utils/sendImgToCloudinary';

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
router.post(
  '/update-cover-photo',
  upload.single('coverImg'),
  userController.updateCoverImg,
);
router.post(
  '/update-profile-photo',
  upload.single('profileImg'),
  userController.updateProfileImg,
);

router.get('/get-user', userController.getUser);
router.get('/get-other-user/:id', userController.getOtherUser);
router.get('/get-all-user', userController.getAllUser);
router.patch('/update-user/:id', userController.updateUser);

export const userRouter = router;
