import {z} from 'zod';

export const signupSchema=z.object({
  name: z.string().min(5).max(256).trim(),
  email: z.email().min(5).max(256).trim(),
  password: z.string().min(5).max(256),
  role: z.enum(['user', 'admin']).default('user'),
});

export const signinSchema=z.object({
  email: z.email().min(5).max(256).trim(),
  password: z.string().min(5).max(256),
});