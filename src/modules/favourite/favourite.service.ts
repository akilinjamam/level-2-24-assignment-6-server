import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../app/errors/AppError';
import { TFavourite } from './favourite.interface';
import Favourite from './favourite.modal';

const createFavourite = async (payload: TFavourite) => {
  const checkUserAlreadyMadeItFavourite = await Favourite.find({
    postId: payload.postId,
  });

  const findUserFromSpecificPost = checkUserAlreadyMadeItFavourite?.find(
    (f: TFavourite) => f?.userId?._id.toString() === payload.userId.toString(),
  );

  if (findUserFromSpecificPost?.userId) {
    throw new AppError(StatusCodes.OK, 'You have already made it favourite');
  }

  const result = await Favourite.create(payload);
  return result;
};

const getFavourite = async () => {
  const result = await Favourite.find({}).populate('postId userId');
  return result;
};

export const favouriteService = {
  createFavourite,
  getFavourite,
};
