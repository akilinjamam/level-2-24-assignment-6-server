import { TFollower } from './follower.interface';
import Follow from './follower.model';

const createFollower = async (payload: TFollower) => {
  const result = await Follow.create(payload);

  return result;
};

export const followerService = {
  createFollower,
};
