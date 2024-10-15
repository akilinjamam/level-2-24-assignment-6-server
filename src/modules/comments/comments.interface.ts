import { Types } from 'mongoose';

export type TComments = {
  postId: Types.ObjectId;
  commenterId: Types.ObjectId;
  comment: string;
};
