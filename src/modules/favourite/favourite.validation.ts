import { Types } from 'mongoose';
import { z } from 'zod';

const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

const favouriteSchema = z.object({
  body: z.object({
    postId: objectIdSchema,
    userId: objectIdSchema,
  }),
});

export const favouriteValidation = {
  favouriteSchema,
};
