import { Response } from 'express';
import * as Yup from 'yup';
import { IReqUser } from '../models/users.model';
import { ITopUp } from '../models/wallet.model';
import { authQuery } from '../queries/auth.query';
import { walletQuery } from '../queries/wallet.query';
import response from '../utils/response.util';

const topUpValidate = Yup.object({
  top_up_amount: Yup.string().required(),
});

export async function topUpBalance(req: IReqUser, res: Response) {
  const { top_up_amount } = req.body as unknown as ITopUp;

  try {
    const user = req.user;

    await topUpValidate.validate({
      top_up_amount,
    });

    const topUpAmount = Number(top_up_amount);

    if (typeof top_up_amount !== 'number' || topUpAmount < 0) {
      return response.nonSuccess(
        res,
        400,
        'The amount parameter can only be a number and cannot be smaller than 0'
      );
    }

    const isExistUser = await authQuery.verifyUserEmail(`${user?.email}`);

    if (!isExistUser) {
      return response.unauthorized(res, 'Token invalid or expired', 401);
    }

    const oldBalance = await walletQuery.getBalance(`${user?.email}`);

    const newBalance = await walletQuery.updateBalance({
      top_up_amount: topUpAmount + oldBalance.balance,
      email: `${user?.email}`,
    });

    return response.success(res, 200, 'Top Up Balance sucessfully', newBalance);
  } catch (error) {
    if (error instanceof Error) {
      return response.nonSuccess(res, 500, error.message);
    } else {
      return response.nonSuccess(res, 500, 'Internal server error');
    }
  }
}

export async function balance(req: IReqUser, res: Response) {
  try {
    const user = req.user;
    const email: string = `${user?.email}`;

    let balance = await walletQuery.getBalance(email);

    if (!balance) {
      await walletQuery.addUserBalance(email);
      balance = await walletQuery.getBalance(email);
    }

    return response.success(res, 200, 'Success get balance', balance);
  } catch (error) {
    if (error instanceof Error) {
      return response.nonSuccess(res, 500, error.message);
    } else {
      return response.nonSuccess(res, 500, 'Internal server error');
    }
  }
}
