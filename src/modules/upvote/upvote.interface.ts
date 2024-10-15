import { Types } from 'mongoose';

export type TUpvote = {
  id: Types.ObjectId;
  upvote: Types.ObjectId;
};
