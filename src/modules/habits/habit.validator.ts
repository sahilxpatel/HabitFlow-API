import { z } from 'zod';

export const CreateHabitSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  frequency: z.enum(['daily', 'weekly']),
  tags: z.array(z.string()).optional(),
  reminderTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format HH:MM').optional(),
});

export const UpdateHabitSchema = CreateHabitSchema.partial();

export const PaginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
  tag: z.string().optional(),
});
