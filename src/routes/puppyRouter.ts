import { Router } from 'express';
import { create, list, update, updateOrder } from '../controllers/PuppyController';

const puppyRouter = Router();

puppyRouter.get('/', list);
puppyRouter.post('/', create);
puppyRouter.post('/:id/order', updateOrder);
puppyRouter.put('/:id', update);

export default puppyRouter;
