import { TPosts } from './posts.interface';
import Post from './posts.model';

const createPosts = async (payload: TPosts, images: string[]) => {
  const data = {
    ...payload,
    images,
  };

  const result = await Post.create(data);
  return result;
};

const getPosts = async () => {
  const result = await Post.find({}).populate('userId');
  return result;
};

const favouritePosts = async (
  postId: string,
  payload: Record<string, unknown>,
) => {
  const result = await Post.updateOne(
    { _id: postId },
    { $set: payload },
    { runValidators: true },
  );
  return result;
};

export const postService = {
  createPosts,
  getPosts,
  favouritePosts,
};
