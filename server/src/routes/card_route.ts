import express from 'express';
import {
    addLabelToCard,
    assignUserToCard,
    createCard,
    deleteCard,
    getCardById,
    getCardsByList,
    removeLabelFromCard,
    removeUserFromCard,
    updateCard,

} from "../controllers/card_controller"
import { verifyUser } from '../middleware/auth_middleware';

const cardRouter = express.Router();

cardRouter.use(verifyUser);

cardRouter.post('/', createCard);
cardRouter.get('/list/:id', getCardsByList);
cardRouter.get('/:id', getCardById);
cardRouter.put('/:id', updateCard);
cardRouter.delete('/:id',deleteCard);
cardRouter.post('/:id/assign', assignUserToCard);
cardRouter.delete('/:id/unassign/:uid', removeUserFromCard);
cardRouter.post('/:id/label', addLabelToCard);
cardRouter.delete('/:id/label/:lid', removeLabelFromCard);

export default cardRouter;