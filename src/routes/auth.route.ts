import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const router = Router();

const auth = {
  register: router.post('/', authController.register),
  login: router.post('/', authController.register),
};

export default auth;
