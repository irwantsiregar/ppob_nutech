import ENV from '../configs/env.config';
const parse = require('url').parse;

const parsedUrl = parse(ENV.DATABASE_URL, true);

const auth = parsedUrl?.auth ? parsedUrl.auth.split(':') : [];
const user = auth[0];
const password = auth[1];
const host = parsedUrl?.hostname;
const port = parsedUrl?.port;
const database = parsedUrl?.pathname.split('/')[1];

const configPGPool = {
  user,
  password,
  host,
  port,
  database,
};

export default configPGPool;
