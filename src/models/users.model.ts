export interface IUser {
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  profile_image: string;
}

export interface IRegister extends Omit<IUser, 'id' | 'profile_image'> {}
