import { Router } from 'express';
import * as profileController from '../controllers/profile.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware, profileController.profile);

router.put('/update', authMiddleware, profileController.profileUpdate);

export default router;
