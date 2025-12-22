// course.validation.ts
import { z } from 'zod';
import { LEVELS } from './course.constants';

export const createCourseSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    bio: z.string().min(1, 'Bio is required'),
    description: z.string().min(1, 'Description is required'),
    thumbnail: z.string().url('Thumbnail must be a valid URL').min(1, 'Thumbnail is required'),
    price: z.number().positive('Price must be greater than 0'),
    level: z.enum(LEVELS, { message: 'Level must be one of beginner, intermediate, advanced' }),
    category_id: z.number().int('Category ID must be an integer'),
    is_active: z.boolean().optional(),
  }),
});

export const updateCourseSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    bio: z.string().min(1, 'Bio is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    thumbnail: z
      .string()
      .url('Thumbnail must be a valid URL')
      .min(1, 'Thumbnail is required')
      .optional(),
    price: z.number().positive('Price must be greater than 0').optional(),
    level: z
      .enum(LEVELS, {
        message: 'Level must be one of beginner, intermediate, advanced',
      })
      .optional(),
    category_id: z.number().int('Category ID must be an integer').optional(),
    is_active: z.boolean().optional(),
  }),
});
