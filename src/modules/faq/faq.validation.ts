import { z } from 'zod';

export const createFaqSchema = z.object({
  body: z.object({
    question: z.string().min(1, 'Question is required'),
    answer: z.string().min(1, 'Answer is required'),
    is_active: z.boolean().optional(),
  }),
});

export const updateFaqSchema = z.object({
  body: z.object({
    question: z.string().min(1, 'Question is required').optional(),
    answer: z.string().min(1, 'Answer is required').optional(),
    is_active: z.boolean().optional(),
  }),
});
