import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';
import sendRespone from '../../app/utils/sendRespone';
import { followerService } from './follower.service';

const createFollower = catchAsync(async (req, res) => {
  const result = await followerService.createFollower(req?.body);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'follower created successfully',
    data: result,
  });
});

export const followerController = {
  createFollower,
};
