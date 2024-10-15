import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';
import sendRespone from '../../app/utils/sendRespone';
import { commentService } from './comments.service';

const createComment = catchAsync(async (req, res) => {
  const result = await commentService.createComment(req?.body);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'you are successfully created comment',
    data: result,
  });
});

const getComment = catchAsync(async (req, res) => {
  const result = await commentService.getComment();

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'commments found successfully',
    data: result,
  });
});

const updateComment = catchAsync(async (req, res) => {
  const result = await commentService.editComment(req?.params?.id, req?.body);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'commments edited successfully',
    data: result,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const result = await commentService.deleteComment(req?.params?.id);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'commments deleted successfully',
    data: result,
  });
});

export const commentController = {
  createComment,
  getComment,
  updateComment,
  deleteComment,
};
