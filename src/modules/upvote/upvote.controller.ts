import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';
import sendRespone from '../../app/utils/sendRespone';
import { upvoteService } from './upvote.service';

const createUpvote = catchAsync(async (req, res) => {
  const result = await upvoteService.createUpvote(req?.body);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'you are successfully upvoted',
    data: result,
  });
});
const getUpvote = catchAsync(async (req, res) => {
  const result = await upvoteService.getUpvote();

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: ' found successfully',
    data: result,
  });
});
const removeUpvote = catchAsync(async (req, res) => {
  const result = await upvoteService.removeUpvote(req.body);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'you have removed upvote',
    data: result,
  });
});

export const upvoteController = {
  createUpvote,
  getUpvote,
  removeUpvote,
};
