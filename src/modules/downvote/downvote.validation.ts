import { Types } from 'mongoose';
import { z } from 'zod';

const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

const downvoteSchema = z.object({
  body: z.object({
    id: objectIdSchema,
    downvote: objectIdSchema,
  }),
});

export const downvoteValidation = {
  downvoteSchema,
};
