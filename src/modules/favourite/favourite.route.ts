import express from 'express';
import jwtAuth from '../../app/middleware/jwtAuth';
import { favouriteController } from './favourite.controller';
import { favouriteValidation } from './favourite.validation';
import validateRequest from '../../app/middleware/validateSchema';

const router = express.Router();

router.post(
  '/create-favourite',
  jwtAuth(),
  validateRequest(favouriteValidation.favouriteSchema),
  favouriteController.createFavourite,
);

router.get('/', jwtAuth(), favouriteController.getFavourite);

export const favouriteRouter = router;
