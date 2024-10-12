import { TRemoveFollow } from './follower.constant';
import { TFollower } from './follower.interface';
import Follow from './follower.model';

const createFollower = async (payload: TFollower) => {
  const result = await Follow.create(payload);

  return result;
};
const getFollow = async () => {
  const result = await Follow.find().populate('id follow');

  return result;
};

const removeFollow = async (payload: TRemoveFollow) => {
  const findMeFollowingOthers = await Follow.find({
    follow: payload.myId,
  }).populate('id follow');

  const findUserWhoWillBeDeleted = findMeFollowingOthers.find(
    (f) => f?.id?._id.toString() === payload.followerId.toString(),
  );

  const result = await Follow.deleteOne({ _id: findUserWhoWillBeDeleted?._id });

  return result;
};

export const followerService = {
  createFollower,
  getFollow,
  removeFollow,
};
