import { Request, Response } from 'express';
import * as Yup from 'yup';

import { IRegister } from '../models/users.model';
import { returnNonSuccess, returnSuccess } from '../utils/response.util';
import { authQuery } from '../queries/auth.query';

const registerValidate = Yup.object({
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  email: Yup.string().email('Email parameters are not formatted correctly').required(),
  password: Yup.string()
    .required()
    .min(6, 'Password must be at least 6 characters')
    .test(
      'at-least-one-uppercase-letter',
      'Password pontains at least one uppercase letter',
      (value) => {
        if (!value) return false;
        const regex = /^(?=.*[A-Z])/;
        return regex.test(value);
      }
    )
    .test('at-least-one-number', 'Password contains at least one number', (value) => {
      if (!value) return false;
      const regex = /^(?=.*\d)/;
      return regex.test(value);
    }),
});

export async function register(req: Request, res: Response) {
  const { email, first_name, last_name, password } = req.body as unknown as IRegister;

  try {
    await registerValidate.validate({
      email,
      first_name,
      last_name,
      password,
    });

    await authQuery.addUser({ email, first_name, last_name, password });

    returnSuccess(req, res, 200, 'Success registration, please login', null);
  } catch (error) {
    if (error instanceof Error) {
      returnNonSuccess(req, res, 500, error.message);
    } else {
      returnNonSuccess(req, res, 500, 'Internal server error');
    }
  }
}
