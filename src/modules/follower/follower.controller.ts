import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';
import sendRespone from '../../app/utils/sendRespone';
import { followerService } from './follower.service';

const createFollower = catchAsync(async (req, res) => {
  const result = await followerService.createFollower(req?.body);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'you are successfully following',
    data: result,
  });
});
const getFollow = catchAsync(async (req, res) => {
  const result = await followerService.getFollow();

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'follow found successfully',
    data: result,
  });
});
const removeFollow = catchAsync(async (req, res) => {
  const result = await followerService.removeFollow(req.body);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'you have removed follow',
    data: result,
  });
});

export const followerController = {
  createFollower,
  getFollow,
  removeFollow,
};
