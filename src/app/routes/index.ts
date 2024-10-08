import express from 'express';
import { userRouter } from '../../modules/registration/registration.route';
import { followingRouter } from '../../modules/follower/follower.route';
import { postsRouter } from '../../modules/posts/posts.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRouter,
  },
  {
    path: '/follow',
    route: followingRouter,
  },
  {
    path: '/posts',
    route: postsRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route as never));

export default router;
