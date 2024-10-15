import { Types } from 'mongoose';
import { z } from 'zod';

const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

const upvoteSchema = z.object({
  body: z.object({
    id: objectIdSchema,
    upvote: objectIdSchema,
  }),
});

export const upvoteValidation = {
  upvoteSchema,
};
