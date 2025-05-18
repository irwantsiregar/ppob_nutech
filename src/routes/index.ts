import { Router } from 'express';
import servicesRoute from './services.route';
import bannersRoute from './banners.route';

const router = Router();

router.use('/services', servicesRoute);

router.use('/banner', bannersRoute);

export default router;
