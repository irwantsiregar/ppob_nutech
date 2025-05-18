import { nanoid } from 'nanoid';
import pool from '../database/pool';
import { IRegister } from '../models/users.model';
import { encrypt } from '../utils/encryption.util';

export class AuthQuery {
  async addUser({ email, first_name, last_name, password }: IRegister) {
    await this.verifyNewEmail(email);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await encrypt(password);

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [id, email, first_name, last_name, hashedPassword],
    };

    const result = await pool.query(query);

    if (!result.rowCount) {
      throw new Error('Failed to add user');
    }

    return result.rows[0];
  }

  async verifyNewEmail(email: string) {
    const query = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [email],
    };

    const result = await pool.query(query);

    if (result.rowCount > 0) {
      throw new Error('Failed to add user. Email is already in use.');
    }
  }
}

export const authQuery = new AuthQuery();
