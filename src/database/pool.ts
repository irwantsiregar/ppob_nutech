const { Pool } = require('pg');
import configPGPool from './parse_url';

const pool = new Pool(configPGPool);

export default pool;
