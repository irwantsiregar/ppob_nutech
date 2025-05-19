import { nanoid } from 'nanoid';
import pool from '../database/pool';
import { ITopUp } from '../models/wallet.model';

export class WalletQuery {
  async getBalance(email: string) {
    const query = {
      text: 'SELECT balance FROM wallet WHERE user_email = $1',
      values: [email],
    };
    const result = await pool.query(query);

    return result.rows[0];
  }

  async updateBalance({ top_up_amount, email }: ITopUp) {
    const query = {
      text: 'UPDATE wallet SET balance = $1 WHERE user_email = $2 RETURNING balance',
      values: [top_up_amount, email],
    };

    const result = await pool.query(query);

    return result.rows[0];
  }

  async addUserBalance(email: string) {
    const id = `balance-${nanoid(10)}`;
    const balance = 0;

    const query = {
      text: 'INSERT INTO wallet VALUES($1, $2, $3) RETURNING balance, user_email',
      values: [id, balance, email],
    };

    const result = await pool.query(query);

    return result.rowCount > 0;
  }
}

export const walletQuery = new WalletQuery();
