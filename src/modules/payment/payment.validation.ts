import { Types } from 'mongoose';
import { z } from 'zod';

const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

const paymentSchema = z.object({
  body: z.object({
    userId: objectIdSchema,
    paid: z.boolean().optional(),
  }),
});

export const paymentValidation = {
  paymentSchema,
};
