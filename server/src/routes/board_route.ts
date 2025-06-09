import { Router } from 'express';
import {
  getBoards,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard,
  addBoardMember,
  removeBoardMember,
} from "../controllers/board_controller"
import { verifyUser } from "../middleware/auth_middleware"
import { checkBoardRole } from '../middleware/board_middleware';

const boardRoute = Router();

boardRoute.use(verifyUser);

boardRoute.get('/',getBoards);
boardRoute.post('/', createBoard);
boardRoute.get('/:id', getBoardById);
boardRoute.put('/:id',checkBoardRole(['ADMIN']), updateBoard);
boardRoute.delete('/:id',checkBoardRole(['ADMIN']), deleteBoard);

boardRoute.post('/:id/members',checkBoardRole(['ADMIN']), addBoardMember);
boardRoute.delete('/:id/members/:uid',checkBoardRole(['ADMIN']), removeBoardMember);

export default boardRoute;
