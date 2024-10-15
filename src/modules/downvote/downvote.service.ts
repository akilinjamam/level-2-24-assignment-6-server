import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../app/errors/AppError';
import Upvote from '../upvote/upvote.model';
import { TRemoveDownvote } from './downvote.constant';
import { TDownvote } from './downvote.interface';
import Downvote from './downvote.model';

const createDownvote = async (payload: TDownvote) => {
  const checkUserAlreadyAvailableInDownvote = await Downvote.find({
    id: payload.id,
  });

  const findUserAlreadyAvailableInDownvote =
    checkUserAlreadyAvailableInDownvote?.find(
      (f) => f?.downvote?._id.toString() === payload.downvote.toString(),
    );

  if (findUserAlreadyAvailableInDownvote) {
    throw new AppError(StatusCodes.OK, 'downvote already given');
  }

  const checkUpvoteExists = await Upvote.find({ upvote: payload.downvote });

  const findPostId = checkUpvoteExists?.find(
    (f) => f?.id?._id.toString() === payload.id.toString(),
  );

  if (findPostId) {
    await Upvote.deleteOne({ _id: findPostId?._id });
  }

  const result = await Downvote.create(payload);

  return result;
};
const getDownvote = async () => {
  const result = await Downvote.find().populate('id downvote');

  return result;
};

const removeDownvote = async (payload: TRemoveDownvote) => {
  const findMeFollowingOthers = await Downvote.find({
    follow: payload.myId,
  }).populate('id downvote');

  const findUserWhoWillBeDeleted = findMeFollowingOthers.find(
    (f) => f?.id?._id.toString() === payload.downvoterId.toString(),
  );

  const result = await Downvote.deleteOne({
    _id: findUserWhoWillBeDeleted?._id,
  });

  return result;
};

export const downvoteService = {
  createDownvote,
  getDownvote,
  removeDownvote,
};
