import { Request, Response } from 'express';
import prisma from '../db';
import { updateUserSchema } from '../utils/validators/user_validator';

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, createdAt: true },
  });
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, createdAt: true },
  });

  if (!user) res.status(404).json({ message: 'User not found' });
  res.json(user);
  return
};

export const updateUser = async (req: Request, res: Response):Promise<void> => {
  const parsed = updateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Validation failed', errors: parsed.error.format() });
    return;
  }

  const { id } = req.params;
  const updated = await prisma.user.update({
    where: { id },
    data: parsed.data,
  });

  res.json({ message: 'User updated', user: updated });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.user.delete({ where: { id } });
  res.json({ message: 'User deleted' });
};
