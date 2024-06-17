import {createAsyncThunk} from '@reduxjs/toolkit';
import {ADD_USER, LOGIN_USER, CREATE_USER} from '../types/user-type';
import axios from 'axios';
import {Env} from '../../env';
// Define User Interface
export interface User {
  name: string;
  userName: string;
  password: string;
  email: string;
  phone: string;
  address: string;
}

// Define Action Interfaces
export interface AddUserAction {
  payload: User;
  type: typeof ADD_USER;
}

export interface LoginUserAction {
  payload: User;
  type: typeof LOGIN_USER;
}

export interface CreateUserAction {
  payload: User;
  type: typeof CREATE_USER;
}

export type UserActionTypes = AddUserAction | LoginUserAction;

// Action Creators
export const addUser = (user: User): AddUserAction => ({
  type: ADD_USER,
  payload: user,
});

// Async Thunk to Create User
export const createUser = createAsyncThunk(
  'user/createUser',
  async (data: User, thunkAPI) => {
    console.log('createUser data = ' + JSON.stringify(data));
    try {
      const response = await axios.post(`${Env.test}/user/create`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error: ', error);
        console.error('Error response: ', error.response);
        console.error('Error response data: ', error.response?.data);
        return thunkAPI.rejectWithValue(
          error.response?.data || 'Something went wrong',
        );
      } else {
        console.error('Non-Axios error: ', error);
        return thunkAPI.rejectWithValue('Something went wrong');
      }
    }
  },
);

// Async Thunk to Login User
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data, thunkAPI) => {
    console.log('loginUser data = ' + JSON.stringify(data));
    try {
      const response = await axios.post(`${Env.test}/user/login`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error: ', error);
        console.error('Error response: ', error.response);
        console.error('Error response data: ', error.response?.data);
        return thunkAPI.rejectWithValue(
          error.response?.data || 'Something went wrong',
        );
      } else {
        console.error('Non-Axios error: ', error);
        return thunkAPI.rejectWithValue('Something went wrong');
      }
    }
  },
);
