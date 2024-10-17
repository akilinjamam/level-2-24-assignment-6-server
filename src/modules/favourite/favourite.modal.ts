import mongoose, { Schema } from 'mongoose';

import { TFavourite } from './favourite.interface';

const favouriteSchema = new Schema<TFavourite>(
  {
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

const Favourite = mongoose.model<TFavourite>('Favourite', favouriteSchema);

export default Favourite;
