export const ADD_USER = 'ADD_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const CREATE_USER = 'CREATE_USER';

export interface LoginUserResponse {
  _id: string;
  address: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  username: string;
}
