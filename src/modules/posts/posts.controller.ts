/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';
import sendRespone from '../../app/utils/sendRespone';
import { postService } from './posts.service';
import { TImageFiles } from './posts.constant';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import config from '../../app/config';

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
  const token = req?.headers?.authorization;

  if (!token) {
    return sendRespone(res, {
      success: false,
      statusCode: StatusCodes.OK,
      message: 'TOKEN not found',
    });
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { id } = decoded;

  const { searchTerm } = req.query;
  const result = await postService.getPosts(searchTerm as string, id);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'post found successfully',
    data: result,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await postService.updatePosts(id, req.body);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'post updated successfully',
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await postService.deletePosts(id);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'post deleted successfully',
    data: result,
  });
});

const updateImg = catchAsync(async (req, res) => {
  const image = req?.file;

  const result = await postService.updateImg(image?.path as string, req?.body);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'post updated successfully',
    data: result,
  });
});
export const postsController = {
  createPosts,
  getPosts,
  updatePost,
  deletePost,
  updateImg,
};
