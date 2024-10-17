import { searchableFields } from './posts.constant';
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

const getPosts = async (searchTearm: string) => {
  let search = {};

  if (searchTearm) {
    search = {
      $or: searchableFields.map((field) => ({
        [field]: { $regex: searchTearm, $options: 'i' },
      })),
    };
  }

  const result = await Post.find(search)
    .populate('userId')
    .sort({ upvotes: -1, createdAt: -1 });
  return result;
};

export const postService = {
  createPosts,
  getPosts,
};
