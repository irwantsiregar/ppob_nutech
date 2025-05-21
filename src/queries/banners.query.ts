import nanoid from '../utils/generateRandomString.util';
import pool from '../database/pool';
import { IBanner } from '../models/banners.model ';

export class BannersQuery {
  async getBanners() {
    const query = {
      text: 'SELECT * FROM banners',
      values: [],
    };
    const result = await pool.query(query);

    return result.rows;
  }
  async addBanner({ banner_name, banner_image, description }: IBanner) {
    const id = `banner-${nanoid(8)}`;

    const query = {
      text: 'INSERT INTO banners VALUES($1, $2, $3, $4) RETURNING *',
      values: [id, banner_name, banner_image, description],
    };

    const result = await pool.query(query);

    if (!result.rowCount) {
      throw new Error('Banner failed to add');
    }

    return result.rows[0];
  }
}

export const bannersQuery = new BannersQuery();
