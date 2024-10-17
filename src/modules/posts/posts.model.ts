import mongoose, { Schema } from 'mongoose';

import { TPosts } from './posts.interface';

const postsSchema = new Schema<TPosts>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    category: { type: String, required: true },
    premium: { type: Boolean, require: true, default: false },
    favourite: { type: Boolean, require: true, default: false },
    upvotes: { type: Number, require: true, default: 0 },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model<TPosts>('Post', postsSchema);

export default Post;
