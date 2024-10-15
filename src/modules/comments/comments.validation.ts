import { Types } from 'mongoose';
import { z } from 'zod';

const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

const commentSchema = z.object({
  body: z.object({
    postId: objectIdSchema,
    commenterId: objectIdSchema,
    comment: z.string(),
  }),
});

export const commentValidation = {
  commentSchema,
};
