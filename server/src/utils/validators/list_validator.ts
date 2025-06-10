import { z } from 'zod';

export const createListSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  order: z.number().int().nonnegative(),
  boardId: z.string().uuid('Invalid board ID'),
});

export const updateListSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  order: z.number().int().nonnegative().optional(),
});
