import crypto from 'crypto';
import ENV from '../configs/env.config';

export const encrypt = (password: string): string => {
  const encrypted = crypto.pbkdf2Sync(password, ENV.SECRET, 1000, 64, 'sha512').toString('hex');

  return encrypted;
};
