import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';
import sendRespone from '../../app/utils/sendRespone';
import { favouriteService } from './favourite.service';

const createFavourite = catchAsync(async (req, res) => {
  const result = await favouriteService.createFavourite(req?.body);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'favourite created successfully',
    data: result,
  });
});

const getFavourite = catchAsync(async (req, res) => {
  const result = await favouriteService.getFavourite();

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'favourite found successfully',
    data: result,
  });
});

export const favouriteController = {
  createFavourite,
  getFavourite,
};
