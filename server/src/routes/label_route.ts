import express from 'express';
import {
    createLabel,
    getAllLabels,
    deleteLabel
} from "../controllers/label_controller"

const labelRouter = express.Router();

labelRouter.post('/', createLabel);
labelRouter.get('/',getAllLabels);
labelRouter.delete('/:id', deleteLabel);

export default labelRouter;
