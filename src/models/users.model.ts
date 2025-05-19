import { Request } from 'express';

export interface IUser {
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  profile_image: string;
}

export interface IUserInput {
  email?: string;
  first_name?: string;
  last_name?: string;
  profile_image?: string;
}

export type IUserToken = Pick<IUser, 'email'>;

export type TLogin = Pick<IUser, 'email' | 'password'>;

export interface IRegister extends Omit<IUser, 'id' | 'profile_image'> {}

export interface IReqUser extends Request {
  user?: IUserToken;
}
