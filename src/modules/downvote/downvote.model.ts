import mongoose, { Schema } from 'mongoose';
import { TDownvote } from './downvote.interface';

const downvoteSchema = new Schema<TDownvote>(
  {
    id: { type: Schema.Types.ObjectId, ref: 'Post' },
    downvote: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

const Downvote = mongoose.model<TDownvote>('Downvote', downvoteSchema);

export default Downvote;
