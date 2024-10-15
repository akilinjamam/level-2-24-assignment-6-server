import mongoose, { Schema } from 'mongoose';
import { TComments } from './comments.interface';

const comentSchema = new Schema<TComments>(
  {
    postId: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
    commenterId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.model<TComments>('Comment', comentSchema);

export default Comment;
