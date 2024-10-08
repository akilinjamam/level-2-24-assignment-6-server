import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';
import sendRespone from '../../app/utils/sendRespone';
import { postService } from './posts.service';

const createPosts = catchAsync(async (req, res) => {
  const result = await postService.createPosts(req?.body);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'post created successfully',
    data: result,
  });
});

const getPosts = catchAsync(async (req, res) => {
  const result = await postService.getPosts();

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'post found successfully',
    data: result,
  });
});

export const postsController = {
  createPosts,
  getPosts,
};
