import { TFollower } from './follower.interface';
import Follow from './follower.model';

const createFollower = async (payload: TFollower) => {
  const result = await Follow.create(payload);

  return result;
};
const getFollow = async () => {
  const result = await Follow.find().populate('id').populate('follow');

  return result;
};

export const followerService = {
  createFollower,
  getFollow,
};
