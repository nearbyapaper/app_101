import {createAsyncThunk} from '@reduxjs/toolkit';
import {ADD_TASK, UPDATE_TASK} from '../types/task-type';
import axios from 'axios';
import {Env} from '../../env';

export interface Task {
  id: string;
  name: string;
  type: string;
  status: string;
  detail: string;
  targetDate: string;
  createdDate?: string;
  createdUser: string;
}

export interface AddTaskAction {
  payload: Task;
  type: typeof ADD_TASK;
}

export interface UpdateTaskAction {
  payload: Task[];
  type: typeof UPDATE_TASK;
}

export type TaskActionTypes = AddTaskAction | UpdateTaskAction;

export const addTask = (task: Task): AddTaskAction => ({
  type: ADD_TASK,
  payload: task,
});

export const createTask = createAsyncThunk(
  'task/createTask',
  async (data: Task, thunkAPI) => {
    console.log('createTask data = ' + JSON.stringify(data));
    try {
      const response = await axios.post(`${Env.test.api}/task/create`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
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

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (data: Task, thunkAPI) => {
    console.log('deleteTask data = ' + JSON.stringify(data));
    try {
      const response = await axios.post(`${Env.test.api}/task/delete`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
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

export const updateTask = createAsyncThunk(
  'task/updateTask',
  async (data: Task, thunkAPI) => {
    console.log('updateTask data = ' + JSON.stringify(data));
    try {
      const response = await axios.post(`${Env.test.api}/task/update`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
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

export const getTask = createAsyncThunk(
  'task/getTask',
  async (data: Task, thunkAPI) => {
    console.log('getTask data = ' + JSON.stringify(data));
    try {
      const response = await axios.get(`${Env.test.api}/task/list/${data}`);
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
