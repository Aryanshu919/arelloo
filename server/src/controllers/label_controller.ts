import { Request, Response } from 'express';
import prisma from '../db';
import { createLabelSchema } from '../utils/validators/label_validator';

export const createLabel = async (req: Request, res: Response) => {
  const parsed = createLabelSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error.format());
    return;
  } 

  const label = await prisma.label.create({
    data: parsed.data,
  });

  res.status(201).json(label);
};

export const getAllLabels = async (_req: Request, res: Response) => {
  const labels = await prisma.label.findMany({
    orderBy: { createdAt: 'desc' },
    include: { cards: true }, // optional: include linked cards
  });
  res.json(labels);
};

export const deleteLabel = async (req: Request, res: Response) => {
  await prisma.label.delete({ where: { id: req.params.id } });
  res.status(204).send();
};
