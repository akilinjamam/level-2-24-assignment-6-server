import { Types } from 'mongoose';

export type TDownvote = {
  id: Types.ObjectId;
  downvote: Types.ObjectId;
};
