import express from 'express';
import {
  createList,
  getListsByBoard,
  updateList,
  deleteList
} from "../controllers/list_controller";
import { verifyUser } from '../middleware/auth_middleware';

const listRouter = express.Router();

listRouter.post('/', verifyUser, createList);
listRouter.get('/board/:id', verifyUser, getListsByBoard);
listRouter.put('/:id', verifyUser, updateList);
listRouter.delete('/:id', verifyUser, deleteList);

export default listRouter;
