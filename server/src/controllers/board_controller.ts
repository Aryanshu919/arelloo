import { Request, Response } from 'express';
import prisma from '../db';
import { createBoardSchema, updateBoardSchema, addMemberSchema } from "../utils/validators/board_validator"

export const getBoards = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  const boards = await prisma.board.findMany({
    where: {
      OR: [
        { ownerId: userId },
        { members: { some: { userId } } },
      ],
    },
    include: { members: true },
  });

  res.json(boards);
};

export const createBoard = async (req: Request, res: Response) => {
    console.log("inside the createBoard controller");
  const parsed = createBoardSchema.safeParse(req.body);
  if (!parsed.success) {
     res.status(400).json({ errors: parsed.error.format() });
     return;
  }

  const userId = req.user?.userId;

  const board = await prisma.board.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      ownerId: userId!,
    },
  });

  res.status(201).json(board);
};

export const getBoardById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const board = await prisma.board.findUnique({
    where: { id },
    include: {
      members: {
        include: {
          user: { select: { id: true, name: true, email: true } },
        },
      },
      lists: true,
    },
  });

  if (!board) {
    res.status(404).json({ message: 'Board not found' });
    return ;
  }

  res.json(board);
};

export const updateBoard = async (req: Request, res: Response) => {
  const parsed = updateBoardSchema.safeParse(req.body);
  if (!parsed.success) {
     res.status(400).json({ errors: parsed.error.format() });
     return;
  }

  const { id } = req.params;

  const updated = await prisma.board.update({
    where: { id },
    data: parsed.data,
  });

  res.json(updated);
};

export const deleteBoard = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.board.delete({ where: { id } });
  res.status(204).send();
};

export const addBoardMember = async (req: Request, res: Response) => {
  const { id } = req.params;

  const parsed = addMemberSchema.safeParse(req.body);
  if (!parsed.success) {
   res.status(400).json({ errors: parsed.error.format() });
     return;
  }

  const existing = await prisma.boardMember.findFirst({
    where: {
      boardId: id,
      userId: parsed.data.userId,
    },
  });

  if (existing) {
     res.status(400).json({ message: 'User already a member' });
     return;
  }

  const member = await prisma.boardMember.create({
    data: {
      boardId: id,
      userId: parsed.data.userId,
      role: 'VIEWER', // Default role
    },
  });

  res.status(201).json(member);
};

export const removeBoardMember = async (req: Request, res: Response) => {
  const { id, uid } = req.params;

  await prisma.boardMember.deleteMany({
    where: {
      boardId: id,
      userId: uid,
    },
  });

  res.status(204).send();
};
