import { Types } from 'mongoose';
import { z } from 'zod';

const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

// Zod schema for TFollower
const postsSchema = z.object({
  body: z.object({
    userId: objectIdSchema, // Must be a valid MongoDB ObjectId
    name: z.string().min(1, 'Name is required'), // Non-empty string
    title: z.string().min(1, 'Title is required'), // Non-empty string
    description: z.string().min(1, 'Description is required'), // Non-empty string
    images: z
      .array(z.string().url('Must be a valid URL'))
      .nonempty('At least one image URL is required'), // Array of valid URLs
    category: z.string().min(1, 'Category is required'), // Non-empty string
  }),
});
export const postsValidation = {
  postsSchema,
};
