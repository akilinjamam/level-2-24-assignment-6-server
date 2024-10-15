import { TComments } from './comments.interface';
import Comment from './comments.model';

const createComment = async (payload: TComments) => {
  const result = await Comment.create(payload);
  return result;
};

const getComment = async () => {
  const result = await Comment.find({});
  return result;
};

const editComment = async (id: string, payload: Record<string, unknown>) => {
  const result = await Comment.updateOne(
    { _id: id },
    { $set: payload },
    { runValidators: true },
  );
  return result;
};

const deleteComment = async (id: string) => {
  const result = await Comment.deleteOne({ _id: id });
  return result;
};

export const commentService = {
  createComment,
  getComment,
  editComment,
  deleteComment,
};
