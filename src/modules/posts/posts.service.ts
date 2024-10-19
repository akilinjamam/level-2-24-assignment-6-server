import User from '../registration/registration.model';
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

const getPosts = async (searchTearm: string, id: string) => {
  let search = {};

  const findUser = await User.findOne({ _id: id });

  if (searchTearm) {
    search = {
      $or: searchableFields.map((field) => ({
        [field]: { $regex: searchTearm, $options: 'i' },
      })),
    };
  }

  let newResult;

  if (findUser?.verified?.toString() === 'true') {
    newResult = await Post.find(search)
      .populate('userId')
      .sort({ upvotes: -1, createdAt: -1 });
  } else {
    newResult = await Post.find({ ...search, premium: false })
      .populate('userId')
      .sort({ upvotes: -1, createdAt: -1 });
  }

  return newResult;
};

const updatePosts = async (id: string, payload: Record<string, unknown>) => {
  const result = Post.updateOne(
    { _id: id },
    { $set: payload },
    { runValidators: true },
  );
  return result;
};

const deletePosts = async (id: string) => {
  const result = Post.deleteOne({ _id: id });
  return result;
};

const updateImg = async (image: string, payload: Record<string, unknown>) => {
  const { index, id } = payload;

  const result = await Post.findByIdAndUpdate(
    id,
    { $set: { [`images.${index}`]: image } },
    { new: true },
  );
  return result;
};

export const postService = {
  createPosts,
  getPosts,
  updatePosts,
  deletePosts,
  updateImg,
};
