import { hash } from 'bcryptjs';

// eslint-disable-next-line import/prefer-default-export
export const hashPassword = async (password: string): Promise<string> =>
  hash(password, 12);
