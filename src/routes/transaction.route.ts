import { Router } from 'express';
import * as transactionController from '../controllers/transaction.controller';

const router = Router();

router.post('/', transactionController.transaction);

router.get('/history', transactionController.transactionHistory);

export default router;
