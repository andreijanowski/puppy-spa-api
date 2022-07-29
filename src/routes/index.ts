import { Router } from 'express';
import puppyRouter from './puppyRouter';
import waitListRouter from './waitListRouter';

const router = Router();

router.use('/puppies', puppyRouter);
router.use('/wait-lists', waitListRouter);

export default router;
