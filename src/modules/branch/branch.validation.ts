import { z } from 'zod';

export const createBranchSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    area: z.string().min(1, 'Area is required'),
    phone: z.string().min(1, 'Phone is required'),
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    is_active: z.boolean().optional(),
    latitude: z.string().min(1, 'Latitude is required'),
    longitude: z.string().min(1, 'Longitude is required'),
  }),
});

export const updateBranchSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    address: z.string().min(1, 'Address is required').optional(),
    city: z.string().min(1, 'City is required').optional(),
    area: z.string().min(1, 'Area is required').optional(),
    phone: z.string().min(1, 'Phone is required').optional(),
    email: z.string().email('Invalid email').optional(),
    is_active: z.boolean().optional(),
    latitude: z.string().min(1, 'Latitude is required').optional(),
    longitude: z.string().min(1, 'Longitude is required').optional(),
  }),
});
