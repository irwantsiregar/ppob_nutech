import dotenv from 'dotenv';
dotenv.config();

/*
const production = {
  PORT: process.env.PORT || 443,
  LOCALHOST: process.env.HOST || '',
  SECRET: process.env.SECRET || '',
  PGPORT: process.env.PGPORT || 5432,
  PGHOST: process.env.PGHOST || '',
  PGUSER: process.env.PGUSER || '',
  PGPASSWORD: process.env.PGPASSWORD || '',
  PGDATABASE: process.env.PGDATABASE || '',
  DATABASE_URL: process.env.PROD_DATABASE_URL || '',
};
*/

const production = {
  PORT: process.env.PORT || 443,
  SECRET: process.env.SECRET || '',
  DATABASE_URL: process.env.PROD_DATABASE_URL || '',
};

const development = {
  PORT: process.env.PORT || 3000,
  SECRET: process.env.SECRET || '',
  DATABASE_URL: process.env.DEV_DATABASE_URL || '',
};

const env = process.env.NODE_ENV === 'production' ? production : development;

export default env;
