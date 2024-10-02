import express from 'express';
import { userRouter } from '../../modules/registration/registration.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route as never));

export default router;
