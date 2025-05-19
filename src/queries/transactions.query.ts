import { nanoid } from 'nanoid';
import pool from '../database/pool';
import { ITransaction } from '../models/transaction.model';

export class TransactionQuery {
  async getTransactions(email: string) {
    const query = {
      text: 'SELECT * FROM transactions WHERE user_email = $1',
      values: [email],
    };

    const result = await pool.query(query);

    return result.rows;
  }

  async addTransaction({
    service_code,
    service_name,
    total_amount,
    user_email,
    transaction_type = 'PAYMENT',
  }: ITransaction) {
    const getDate = `${new Date().getDay()}${new Date().getMonth()}${new Date().getFullYear()}`;

    const invoice_number = `ENV${getDate}-${nanoid(6)}`;

    const created_on = new Date().toISOString();

    const id = `trc-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO transactions VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      values: [
        id,
        user_email,
        invoice_number,
        transaction_type,
        service_code,
        service_name,
        service_name,
        total_amount,
        created_on,
      ],
    };

    const result = await pool.query(query);

    return result.rows[0];
  }
}

export const transactionQuery = new TransactionQuery();
