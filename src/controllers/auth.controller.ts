import { Request, Response } from 'express';
import * as Yup from 'yup';
import { IRegister, TLogin } from '../models/users.model';
import { authQuery } from '../queries/auth.query';
import { walletQuery } from '../queries/wallet.query';
import { encrypt } from '../utils/encryption.util';
import { generateToken } from '../utils/jwt.util';
import response from '../utils/response.util';

const registerValidate = Yup.object({
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  email: Yup.string().email('Email parameters are not formatted correctly!').required(),
  password: Yup.string()
    .required()
    .min(6, 'Password must be at least 6 characters')
    .test(
      'at-least-one-uppercase-letter',
      'Password contains at least one uppercase letter',
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

const loginValidate = Yup.object({
  email: Yup.string().email('Email parameters are not formatted correctly!').required(),
  password: Yup.string().required(),
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

    const isExistUser = await authQuery.verifyUserEmail(email);

    if (isExistUser) {
      return response.nonSuccess(res, 400, 'Failed to add user. Email is already in use!');
    }

    const isRegistered = await authQuery.addUser({ email, first_name, last_name, password });

    if (!isRegistered) {
      return response.nonSuccess(res, 400, 'Failed to add user');
    }

    await walletQuery.addUserBalance(email);

    return response.success(res, 200, 'Success registration, please login', null);
  } catch (error) {
    if (error instanceof Error) {
      return response.nonSuccess(res, 500, error.message);
    } else {
      return response.nonSuccess(res, 500, 'Internal server error');
    }
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as unknown as TLogin;

  try {
    await loginValidate.validate({
      email,
      password,
    });

    const isExistUser = await authQuery.verifyUserEmail(email);

    if (!isExistUser) {
      return response.notFound(res, 'User not found!', 400);
    }

    const user = await authQuery.verifyUserEmail(email, true);

    // Password validate
    const validatePassword: boolean = encrypt(password) === user.password;

    if (!validatePassword) {
      return response.unauthorized(res, 'Password is wrong!', 401);
    }

    const token = generateToken({
      email: user.email,
    });

    const accessToken = { token };

    return response.success(res, 200, 'Login success.', accessToken);
  } catch (error) {
    return response.nonSuccess(res, 500, 'Login failed');
  }
}
