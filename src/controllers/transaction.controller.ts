import { Response } from 'express';
import * as Yup from 'yup';
import { TServiceCode } from '../models/transaction.model';
import { IReqUser } from '../models/users.model';
import { authQuery } from '../queries/auth.query';
import { servicesQuery } from '../queries/services.query';
import { transactionQuery } from '../queries/transactions.query';
import response from '../utils/response.util';
import { walletQuery } from '../queries/wallet.query';

const transactionValidate = Yup.object({
  service_code: Yup.string().required(),
});

export async function transaction(req: IReqUser, res: Response) {
  const { service_code } = req.body as unknown as TServiceCode;

  try {
    const user = req.user;

    await transactionValidate.validate({
      service_code,
    });

    const service = await servicesQuery.getService(service_code);

    if (!service) {
      return response.nonSuccess(res, 400, 'The service not found!');
    }

    const isExistUser = await authQuery.verifyUserEmail(`${user?.email}`);

    if (!isExistUser) {
      return response.unauthorized(res, 'Token invalid or expired', 401);
    }

    const userBalance = await walletQuery.getBalance(`${user?.email}`);

    if (userBalance.balance < service.service_tariff) {
      return response.nonSuccess(res, 400, 'Your balance is limited!');
    }

    const newTransaction = await transactionQuery.addTransaction({
      ...service,
      total_amount: service.service_tariff,
      user_email: user?.email,
    });

    if (!newTransaction) {
      return response.nonSuccess(res, 401, 'Failed for transaction!');
    }

    const updateBalance = Number(userBalance.balance) - Number(service.service_tariff);

    await walletQuery.updateBalance({
      top_up_amount: updateBalance,
      email: `${user?.email}`,
    });

    return response.success(res, 200, 'Transaction sucessfully', newTransaction);
  } catch (error) {
    if (error instanceof Error) {
      return response.nonSuccess(res, 500, error.message);
    } else {
      return response.nonSuccess(res, 500, 'Internal server error');
    }
  }
}

export async function transactionHistory(req: IReqUser, res: Response) {
  try {
    const user = req.user;

    const transactions = await transactionQuery.getTransactions(`${user?.email}`);

    if (!transactions) {
      return response.notFound(res, 'Transaction not found!');
    }

    return response.success(res, 200, 'Success get transaction history', transactions);
  } catch (error) {
    if (error instanceof Error) {
      return response.nonSuccess(res, 500, error.message);
    } else {
      return response.nonSuccess(res, 500, 'Internal server error');
    }
  }
}
