import { TPosts } from './posts.interface';
import Post from './posts.model';

const createPosts = async (payload: TPosts) => {
  const result = await Post.create(payload);
  return result;
};

const getPosts = async () => {
  const result = await Post.find({}).populate('userId');
  return result;
};

export const postService = {
  createPosts,
  getPosts,
};
