import { Request, Response } from 'express';
import prisma from '../db';
import { createListSchema, updateListSchema } from "../utils/validators/list_validator"

// POST / - Create a list
export const createList = async (req: Request, res: Response) => {
  const parsed = createListSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Validation failed', errors: parsed.error.format() });
     return;
  }

  const { title, order, boardId } = parsed.data;

  try {
    const list = await prisma.list.create({
      data: { title, order, boardId }
    });

    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ message: 'Error creating list', error: err });
  }
};
export const getListsByBoard = async (req: Request, res: Response) => {
  const boardId = req.params.id;

  try {
    const lists = await prisma.list.findMany({
      where: { boardId },
      orderBy: { order: 'asc' },
      include:{ cards: true },
    });
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching lists', error: err });
  }
};
// PUT /:id - Update list
export const updateList = async (req: Request, res: Response) => {
  const listId = req.params.id;
  const parsed = updateListSchema.safeParse(req.body);

  if (!parsed.success) {
     res.status(400).json({ message: 'Validation failed', errors: parsed.error.format() });
     return;
  }

  try {
    const updated = await prisma.list.update({
      where: { id: listId },
      data: parsed.data,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating list', error: err });
  }
};

export const deleteList = async (req: Request, res: Response) => {
  const listId = req.params.id;

  try {
    await prisma.list.delete({ where: { id: listId } });
    res.json({ message: 'List deleted successfully' });
    return;
  } catch (err) {
    res.status(500).json({ message: 'Error deleting list', error: err });
  }
};
