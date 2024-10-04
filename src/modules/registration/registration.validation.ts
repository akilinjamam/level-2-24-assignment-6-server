import { z } from 'zod';

const registrationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['user', 'admin']).optional().default('user'),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});
const changePasswordSchema = z.object({
  body: z.object({
    oldPassword: z.string(),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});
const sendRecoveryPasswordSchema = z.object({
  body: z.object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});
const passwordRecoverySchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
  }),
});

export const registerSchema = {
  registrationSchema,
  loginSchema,
  changePasswordSchema,
  sendRecoveryPasswordSchema,
  passwordRecoverySchema,
};
