import express, { NextFunction, Request, Response } from 'express';
// import validateRequest from '../../app/middleware/validateSchema';
// import { postsValidation } from './posts.validation';
import jwtAuth from '../../app/middleware/jwtAuth';
import { postsController } from './posts.controller';
import { upload } from '../../app/utils/sendImgToCloudinary';

const router = express.Router();

router.post(
  '/create-posts',
  jwtAuth(),
  upload.fields([{ name: 'images' }]),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  postsController.createPosts,
);

router.get('/', jwtAuth(), postsController.getPosts);
router.patch('/:id', jwtAuth(), postsController.updatePost);
router.delete('/:id', jwtAuth(), postsController.deletePost);
router.post(
  '/update-image',
  jwtAuth(),
  upload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  postsController.updateImg,
);

export const postsRouter = router;
