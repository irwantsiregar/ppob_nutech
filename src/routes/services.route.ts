import { Router } from 'express';
import * as servicesController from '../controllers/services.controller';

const router = Router();

router.get('/', servicesController.getServices);

export default router;
