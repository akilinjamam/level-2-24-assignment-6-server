import Downvote from '../downvote/downvote.model';
import Post from '../posts/posts.model';
import { TRemoveUpvote } from './upvote.constant';
import { TUpvote } from './upvote.interface';
import Upvote from './upvote.model';

const createUpvote = async (payload: TUpvote) => {
  const checkUserAlreadyAvailableInUpvote = await Upvote.find({
    id: payload.id,
  });

  const findUserAlreadyAvailableInUpvote =
    checkUserAlreadyAvailableInUpvote?.find(
      (f) => f?.upvote?._id.toString() === payload.upvote.toString(),
    );

  if (findUserAlreadyAvailableInUpvote) {
    await Upvote.deleteOne({
      _id: findUserAlreadyAvailableInUpvote?._id,
    });

    const findUpvotesAccordingToPostIds = await Upvote?.find({
      id: payload?.id,
    });
    const totalUpvotes = findUpvotesAccordingToPostIds?.length;

    await Post.updateOne(
      { _id: payload.id },
      { $set: { upvotes: totalUpvotes } },
      { runValidators: true },
    );

    return;
  }

  const checkDownvoteExists = await Downvote.find({ downvote: payload.upvote });

  const findPostId = checkDownvoteExists?.find(
    (f) => f?.id?._id.toString() === payload.id.toString(),
  );

  if (findPostId) {
    await Downvote.deleteOne({ _id: findPostId?._id });
  }

  const result = await Upvote.create(payload);

  const findUpvotesAccordingToPostIds = await Upvote?.find({
    id: payload?.id,
  });

  const totalUpvotes = findUpvotesAccordingToPostIds?.length;

  await Post.updateOne(
    { _id: payload.id },
    { $set: { upvotes: totalUpvotes } },
    { runValidators: true },
  );

  return result;
};

const getUpvote = async () => {
  const result = await Upvote.find().populate('id upvote');

  return result;
};

const removeUpvote = async (payload: TRemoveUpvote) => {
  const findMeFollowingOthers = await Upvote.find({
    follow: payload.myId,
  }).populate('id upvote');

  const findUserWhoWillBeDeleted = findMeFollowingOthers.find(
    (f) => f?.id?._id.toString() === payload.upvoterId.toString(),
  );

  const result = await Upvote.deleteOne({ _id: findUserWhoWillBeDeleted?._id });

  return result;
};

export const upvoteService = {
  createUpvote,
  getUpvote,
  removeUpvote,
};
