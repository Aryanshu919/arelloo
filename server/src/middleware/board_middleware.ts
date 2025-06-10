
import { Request, Response, NextFunction } from 'express';
import prisma from '../db';

export const checkBoardRole = (requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;
    const boardId = req.params.id;

    if (!userId || !boardId) {
      res.status(400).json({ message: 'Invalid request' });
      return 
    }

    const board = await prisma.board.findUnique({
      where: { id: boardId },
      include: { owner: true },
    });

    if (!board) {
      res.status(404).json({ message: 'Board not found' });
       return
    }

    // If user is board owner, allow all access
    if (board.ownerId === userId) {
      next();
      return
    }

    // Otherwise, check board member role
    const member = await prisma.boardMember.findFirst({
      where: { boardId, userId },
    });

    if (!member || !requiredRoles.includes(member.role)) {
      res.status(403).json({ message: 'Access denied' });
      return ;
    }

    next();
  };
};