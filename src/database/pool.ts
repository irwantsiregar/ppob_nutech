/*eslint global-require: "error"*/

const { Pool } = require('pg');

const Config = {
  host: 'localhost',
  user: 'developer',
  password: 'developer',
  database: 'notech_test',
  port: 5432,
};

const pool = new Pool(Config);

export default pool;
