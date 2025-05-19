import jwt from 'jsonwebtoken';
import ENV from '../configs/env.config';
import { IUserToken } from '../models/users.model';

export const generateToken = (user: IUserToken) => {
  const token = jwt.sign(user, ENV.SECRET, {
    expiresIn: '12h',
  });

  return token;
};

export const getUserData = (token: string) => {
  const user = jwt.verify(token, ENV.SECRET) as IUserToken;

  return user;
};
