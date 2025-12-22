import { z } from 'zod';

export const createCourseCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Category name is required'),
    is_active: z.boolean().optional(),
  }),
});

export const updateCourseCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Category name is required').optional(),
    is_active: z.boolean().optional(),
  }),
});
