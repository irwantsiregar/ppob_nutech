import pool from '../database/pool';
import { IService } from '../models/services.model';

export class ServicesQuery {
  async getServices() {
    const query = {
      text: 'SELECT * FROM services',
      values: [],
    };
    const result = await pool.query(query);

    return result.rows;
  }
  async addService({ service_code, service_name, service_icon, service_tariff }: IService) {
    const query = {
      text: 'INSERT INTO services VALUES($1, $2, $3, $4) RETURNING *',
      values: [service_code, service_name, service_icon, service_tariff],
    };

    const result = await pool.query(query);

    if (!result.rowCount) {
      throw new Error('Service failed to add');
    }

    return result.rows[0];
  }
}

export const servicesQuery = new ServicesQuery();
