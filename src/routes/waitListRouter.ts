import { Router } from 'express';
import { create, list, checkDate } from '../controllers/WaitListController';

const waitListRouter = Router();

waitListRouter.get('/', list);
waitListRouter.post('/', create);
waitListRouter.get('/check-date', checkDate);

export default waitListRouter;
