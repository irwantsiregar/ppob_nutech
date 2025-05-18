import { Router } from 'express';
import servicesRoute from './services.route';
import bannersRoute from './banners.route';
import authRoute from './auth.route';

const router = Router();

router.use('/services', servicesRoute);

router.use('/banner', bannersRoute);

router.use('/registration', authRoute.register);

router.use('/login', authRoute.register);


export default router;
