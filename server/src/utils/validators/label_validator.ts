import { z } from 'zod';

export const createLabelSchema = z.object({
  name: z.string().min(1, 'Label name is required'),
  color: z.string().min(1, 'Color is required'), // Could add hex/rgb validation if needed
});
