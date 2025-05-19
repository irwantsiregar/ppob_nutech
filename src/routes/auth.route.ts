import * as authController from '../controllers/auth.controller';

const auth = {
  register: authController.register,
  login: authController.login,
};

export default auth;
