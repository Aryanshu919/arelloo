// controllers/comment.controller.ts
import { Request, Response } from 'express';
import prisma from '../db';
import { createCommentSchema, updateCommentSchema } from '../utils/validators/comment_validator';

export const addCommentToCard = async (req: Request, res: Response) => {
  const parsed = createCommentSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error.format());
    return;
  } 
  const { cardId, authorId, content } = parsed.data;

  const comment = await prisma.comment.create({
    data: { cardId, authorId, content, },
  });

  res.status(201).json(comment);
};

export const getCommentsForCard = async (req: Request, res: Response) => {
  const cardId = req.params.id;

  const comments = await prisma.comment.findMany({
    where: { cardId },
    orderBy: { createdAt: 'asc' },
  });

  res.json(comments);
};

export const updateComment = async (req: Request, res: Response) => {
  const parsed = updateCommentSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const { content } = parsed.data;

  const comment = await prisma.comment.update({
    where: { id: req.params.id },
    data: { content },
  });

  res.json(comment);
};

export const deleteComment = async (req: Request, res: Response) => {
  await prisma.comment.delete({
    where: { id: req.params.id },
  });

  res.status(204).send();
};
