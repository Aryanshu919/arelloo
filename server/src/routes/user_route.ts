import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user_controller"
import { verifyUser } from '../middleware/auth_middleware';


const userRouter = Router();



userRouter.route('/').get(verifyUser, getAllUsers);
userRouter.route('/:id').get(verifyUser, getUserById);
userRouter.route('/:id').put(verifyUser, updateUser);
userRouter.route('/:id').delete(verifyUser, deleteUser);

export default userRouter;
