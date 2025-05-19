import { Router } from 'express';
import * as walletController from '../controllers/wallet.controller';
import authMiddleware from '../middlewares/auth.middleware';
import authRoute from './auth.route';
import bannersRoute from './banners.route';
import profileUser from './profile.route';
import servicesRoute from './services.route';
import transactionRoute from './transaction.route';

const router = Router();

/**
 * @RouteAuth
 * User register and login for the can access routes
 */
router.post('/registration', authRoute.register);

router.post('/login', authRoute.login);

/**
 * @RouteAuthenticated
 * The can access with Authenticated
 */
router.use('/profile', profileUser);

router.get('/balance', authMiddleware, walletController.balance);

router.post('/topup', authMiddleware, walletController.topUpBalance);

router.use('/transaction', authMiddleware, transactionRoute);

/**
 * @RouteUnAuthenticated
 * The can access with un-authenticated
 */
router.use('/services', servicesRoute);

router.use('/banner', bannersRoute);

export default router;
