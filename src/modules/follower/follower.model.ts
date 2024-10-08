import mongoose, { Schema } from 'mongoose';

import { TFollower } from './follower.interface';

const followSchema = new Schema<TFollower>(
  {
    id: { type: Schema.Types.ObjectId, ref: 'User' },
    follow: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

const Follow = mongoose.model<TFollower>('Follow', followSchema);

export default Follow;
