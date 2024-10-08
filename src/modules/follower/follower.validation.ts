import { Types } from 'mongoose';
import { z } from 'zod';

const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

const followingSchema = z.object({
  body: z.object({
    id: objectIdSchema,
    follow: objectIdSchema,
  }),
});

export const followerValidation = {
  followingSchema,
};
