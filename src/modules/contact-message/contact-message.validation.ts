import { z } from 'zod';

export const createContactMessageSchema = z.object({
  body: z.object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    phone: z.string().min(1, 'Phone is required'),
    email: z.string().email('Invalid email').optional(),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(1, 'Message is required'),
  }),
});

export const updateContactMessageSchema = z.object({
  body: z.object({
    first_name: z.string().min(1, 'First name is required').optional(),
    last_name: z.string().min(1, 'Last name is required').optional(),
    phone: z.string().min(1, 'Phone is required').optional(),
    email: z.string().email('Invalid email').optional(),
    subject: z.string().min(1, 'Subject is required').optional(),
    message: z.string().min(1, 'Message is required').optional(),
  }),
});
