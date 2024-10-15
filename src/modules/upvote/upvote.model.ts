import mongoose, { Schema } from 'mongoose';

import { TUpvote } from './upvote.interface';

const upvoteSchema = new Schema<TUpvote>(
  {
    id: { type: Schema.Types.ObjectId, ref: 'Post' },
    upvote: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

const Upvote = mongoose.model<TUpvote>('Upvote', upvoteSchema);

export default Upvote;
