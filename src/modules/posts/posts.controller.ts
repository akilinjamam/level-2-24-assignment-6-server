/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';
import sendRespone from '../../app/utils/sendRespone';
import { postService } from './posts.service';
import { TImageFiles } from './posts.constant';

const createPosts = catchAsync(async (req, res) => {
  const images = req?.files as TImageFiles;
  const allImages = images?.images?.map((image) => image?.path);

  const result = await postService.createPosts(req?.body, allImages);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'post created successfully',
    data: result,
  });
});

const getPosts = catchAsync(async (req, res) => {
  const { searchTerm } = req.query;
  const result = await postService.getPosts(searchTerm as string);

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
