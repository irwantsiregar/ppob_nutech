/*eslint global-require: "error"*/
import ENV from '../configs/env.config';

const { Pool } = require('pg');

const Config = {
  port: ENV.PGPORT,
  host: ENV.PGHOST,
  user: ENV.PGUSER,
  password: ENV.PGPASSWORD,
  database: ENV.PGDATABASE,
};

const pool = new Pool(Config);

export default pool;
