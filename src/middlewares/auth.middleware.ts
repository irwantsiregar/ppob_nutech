import { NextFunction, Request, Response } from 'express';
import { IReqUser } from '../models/users.model';
import { getUserData } from '../utils/jwt.util';
import response from '../utils/response.util';

export default (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers?.authorization;

  if (!authorization) {
    return response.unauthorized(res);
  }

  const [prefix, token] = authorization?.split(' ') || [];

  if (!(prefix === 'Bearer' && token)) {
    return response.unauthorized(res);
  }

  const user = getUserData(token);

  if (!user) {
    return response.unauthorized(res);
  }

  (req as IReqUser).user = user;

  next();
};
