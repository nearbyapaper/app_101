import {createAsyncThunk} from '@reduxjs/toolkit';
import {ADD_USER, LOGIN_USER, CREATE_USER} from '../types/user-type';
import axios from 'axios';

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
      const response = await axios.post(
        'http://localhost:3333/user/create',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error: any) {
      // Ensure error type is any to access response.data
      console.log('error : ' + error);
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Something went wrong',
      );
    }
  },
);

// Define Login Data Interface
interface LoginData {
  userName: string;
  password: string;
}

// Async Thunk to Login User
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: LoginData, thunkAPI) => {
    console.log('loginUser data = ' + JSON.stringify(data));
    try {
      const response = await axios.post(
        'http://localhost:3333/user/login',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error: any) {
      // Ensure error type is any to access response.data
      console.log('error : ' + error);
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Something went wrong',
      );
    }
  },
);
