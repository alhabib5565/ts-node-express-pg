import { z } from 'zod';
import { PRIORITIES, STATUSES } from './notice.constants';

export const createNoticeSchema = z.object({
  body: z.object({
    date: z.string().min(1, 'Date is required'),
    title: z.string().min(1, 'Title is required'),
    notice_category_id: z.number().int('Notice category ID must be an integer'),
    description: z.string().min(1, 'Description is required'),
    status: z.enum(STATUSES, {
      message: 'Status must be one of new, active, upcoming, expired',
    }),
    priority: z.enum(PRIORITIES, {
      message: 'Priority must be one of high, low, medium',
    }),
  }),
});

export const updateNoticeSchema = z.object({
  body: z.object({
    date: z.string().min(1, 'Date is required').optional(),
    title: z.string().min(1, 'Title is required').optional(),
    notice_category_id: z.number().int('Notice category ID must be an integer').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    status: z
      .enum(STATUSES, {
        message: 'Status must be one of new, active, upcoming, expired',
      })
      .optional(),
    priority: z
      .enum(PRIORITIES, {
        message: 'Priority must be one of high, low, medium',
      })
      .optional(),
  }),
});
