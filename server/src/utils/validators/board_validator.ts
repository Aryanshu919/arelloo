import { z } from 'zod';

export const createBoardSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

export const updateBoardSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export const addMemberSchema = z.object({
  email: z.string().email(),
  role: z.enum(["VIEWER", "EDITOR", "ADMIN"]).default("VIEWER"),
});
