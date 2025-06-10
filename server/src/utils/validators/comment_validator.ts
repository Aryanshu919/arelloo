
import { z } from 'zod';

export const createCommentSchema = z.object({
  cardId: z.string().uuid(),
  authorId: z.string().uuid(),
  content: z.string().min(1, 'Comment text is required'),
});

export const updateCommentSchema = z.object({
  content: z.string().min(1, 'Updated comment text is required'),
});
