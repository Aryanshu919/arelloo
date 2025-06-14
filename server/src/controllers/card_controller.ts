import { Request, Response } from 'express';
import prisma from '../db';
import { createCardSchema, updateCardSchema } from '../utils/validators/card_validator'

export const createCard = async (req: Request, res: Response) => {
  const parsed = createCardSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error.format());
    return;
  } 

  const { title, description, order, listId, dueDate } = parsed.data;
  const card = await prisma.card.create({
    data: { title, description, order, listId, dueDate },
    include:{
      labels: true,
      comments: true,
    }
  });
  res.status(201).json(card);
};

export const getCardsByList = async (req: Request, res: Response) => {
  const listId = req.params.id;
  const cards = await prisma.card.findMany({ where: { listId } });
  res.json(cards);
};

export const getCardById = async (req: Request, res: Response) => {
  const card = await prisma.card.findUnique({ where: { id: req.params.id } });
  if (!card) {
    res.status(404).json({ message: 'Card not found' });
    return;
  }
  res.json(card);
};

export const updateCard = async (req: Request, res: Response) => {
  const parsed = updateCardSchema.safeParse(req.body);
  if (!parsed.success){
    res.status(400).json(parsed.error.format());
    return 
  }

  const card = await prisma.card.update({
    where: { id: req.params.id },
    data: parsed.data,
  });
  res.json(card);
};

export const deleteCard = async (req: Request, res: Response) => {
  await prisma.card.delete({ where: { id: req.params.id } });
  res.status(204).send();
};

export const assignUserToCard = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const cardMember = await prisma.cardMember.create({
    data: {
      cardId: req.params.id,
      userId,
    },
  });
  res.status(201).json(cardMember);
};

export const removeUserFromCard = async (req: Request, res: Response) => {
  await prisma.cardMember.deleteMany({
    where: {
      cardId: req.params.id,
      userId: req.params.uid,
    },
  });
  res.status(204).send();
};

export const addLabelToCard = async (req: Request, res: Response) => {
  const { labelId } = req.body;
  const cardLabel = await prisma.cardLabel.create({
    data: {
      cardId: req.params.id,
      labelId,
    },
  });
  res.status(201).json(cardLabel);
};

export const removeLabelFromCard = async (req: Request, res: Response) => {
  await prisma.cardLabel.deleteMany({
    where: {
      cardId: req.params.id,
      labelId: req.params.lid,
    },
  });
  res.status(204).send();
};