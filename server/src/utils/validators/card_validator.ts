import { z } from 'zod';

export const createCardSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  order: z.number(),
  listId: z.string().uuid(),
  dueDate: z.string().datetime().optional(),
});

export const updateCardSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  order: z.number().optional(),
  dueDate: z.string().datetime().optional(),
});