import { Router } from 'express';
import * as bannersController from '../controllers/banners.controller';

const router = Router();

router.get('/', bannersController.getBanners);

export default router;
