import { z } from 'zod';

export const createBatchSchema = z.object({
  name: z.string().min(1, 'Batch name is required'),
  description: z.string().optional().nullable(),
  day: z.array(z.string()),
  time: z.string().datetime({ message: 'Invalid timestamp format' }),
  is_active: z.boolean().optional(),
});

export const updateBatchSchema = z.object({
  name: z.string().min(1, 'Batch name is required').optional(),
  description: z.string().optional().nullable().optional(),
  day: z.array(z.string()).optional(),
  time: z.string().datetime({ message: 'Invalid timestamp format' }).optional(),
  is_active: z.boolean().optional(),
});
