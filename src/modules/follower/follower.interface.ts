import { Types } from 'mongoose';

export type TFollower = {
  id: Types.ObjectId;
  follow: Types.ObjectId;
};
