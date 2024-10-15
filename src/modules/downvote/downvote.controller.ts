import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';
import sendRespone from '../../app/utils/sendRespone';
import { downvoteService } from './downvote.service';

const createDownvote = catchAsync(async (req, res) => {
  const result = await downvoteService.createDownvote(req?.body);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'you are successfully Downvoted',
    data: result,
  });
});
const getDownvote = catchAsync(async (req, res) => {
  const result = await downvoteService.getDownvote();

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: ' found successfully',
    data: result,
  });
});
const removeDownvote = catchAsync(async (req, res) => {
  const result = await downvoteService.removeDownvote(req.body);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'you have removed Downvote',
    data: result,
  });
});

export const downvoteController = {
  createDownvote,
  getDownvote,
  removeDownvote,
};
