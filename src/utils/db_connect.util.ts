import pool from '../database/pool';

const databaseConnect = async () => {
  try {
    const res = await pool.query('SELECT NOW()');

    return Promise.resolve('Database connected!');
  } catch (error) {
    return Promise.reject(`'Error connecting to PostgreSQL: ${error}`);
  }
};

export default databaseConnect;
