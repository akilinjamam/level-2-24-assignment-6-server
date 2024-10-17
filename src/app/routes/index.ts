import express from 'express';
import { userRouter } from '../../modules/registration/registration.route';
import { followingRouter } from '../../modules/follower/follower.route';
import { postsRouter } from '../../modules/posts/posts.route';
import { upvoteRouter } from '../../modules/upvote/upvote.route';
import { downvoteRouter } from '../../modules/downvote/downvote.route';
import { commentRouter } from '../../modules/comments/comments.route';
import { favouriteRouter } from '../../modules/favourite/favourite.route';

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
  {
    path: '/upvote',
    route: upvoteRouter,
  },
  {
    path: '/downvote',
    route: downvoteRouter,
  },
  {
    path: '/comment',
    route: commentRouter,
  },
  {
    path: '/favourite',
    route: favouriteRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route as never));

export default router;
