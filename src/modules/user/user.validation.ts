import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    course_id: z.number().min(1, 'Course ID must be at least 1'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['user', 'admin']).optional().default('user'),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    role: z.enum(['user', 'admin']).optional(),
    is_active: z.boolean().optional(),
  }),
});
