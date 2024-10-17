import express from 'express';
import jwtAuth from '../../app/middleware/jwtAuth';
import { favouriteController } from './favourite.controller';

const router = express.Router();

router.post('/create-posts', jwtAuth(), favouriteController.createFavourite);

router.get('/', jwtAuth(), favouriteController.getFavourite);

export const favouriteRouter = router;
