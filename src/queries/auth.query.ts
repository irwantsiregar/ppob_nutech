import nanoid from '../utils/generateRandomString.util';
import pool from '../database/pool';
import { IRegister, IUserInput } from '../models/users.model';
import { encrypt } from '../utils/encryption.util';

export class AuthQuery {
  async addUser({ email, first_name, last_name, password }: IRegister) {
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await encrypt(password);

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5) RETURNING first_name, last_name',
      values: [id, email, first_name, last_name, hashedPassword],
    };

    const result = await pool.query(query);

    return result.rowCount > 0;
  }

  async updateUser({ email, first_name, last_name }: IUserInput) {
    const query = {
      text: 'UPDATE users SET first_name = $1, last_name = $2 WHERE email = $3 RETURNING email',
      values: [first_name, last_name, email],
    };

    const result = await pool.query(query);

    return result.rowCount > 0;
  }

  async updateUserImage({ email, profile_image }: IUserInput) {
    const query = {
      text: 'UPDATE users SET profile_image = $1 WHERE email = $3 RETURNING email, profile_image',
      values: [profile_image, email],
    };

    const result = await pool.query(query);

    return result.rowCount > 0;
  }

  async verifyUserEmail(email: string, withUser: boolean = false) {
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };

    const result = await pool.query(query);

    if (withUser) {
      return result.rows[0];
    }

    return result.rowCount > 0;
  }

  async getUserByEmail(email: string) {
    const query = {
      text: 'SELECT email, first_name, last_name, profile_image FROM users WHERE email = $1',
      values: [email],
    };

    const result = await pool.query(query);

    return result.rows[0];
  }
}

export const authQuery = new AuthQuery();
