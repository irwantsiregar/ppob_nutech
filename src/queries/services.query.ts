import nanoid from '../utils/generateRandomString.util';
import pool from '../database/pool';
import { IService } from '../models/services.model';

export class ServicesQuery {
  async addService({ service_code, service_name, service_icon, service_tariff }: IService) {
    const id = `service-${nanoid(8)}`;

    const query = {
      text: 'INSERT INTO services VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [id, service_code, service_name, service_icon, service_tariff],
    };

    const result = await pool.query(query);

    if (!result.rowCount) {
      throw new Error('Service failed to add');
    }

    return result.rows[0];
  }

  async getServices() {
    const query = {
      text: 'SELECT * FROM services',
      values: [],
    };
    const result = await pool.query(query);

    return result.rows;
  }

  async getService(service_code: string) {
    const query = {
      text: 'SELECT service_code, service_name, service_tariff FROM services WHERE service_code = $1',
      values: [service_code],
    };

    const result = await pool.query(query);

    return result.rows[0];
  }
}

export const servicesQuery = new ServicesQuery();
