import {User, createUser, loginUser} from '../actions/user-action';
import {createSlice} from '@reduxjs/toolkit';

export interface UserState {
  user: User;
  loading: boolean;
  error: string | null;
}

// const initialize: UserState = {
//   user: {
//     name: '',
//     userName: '',
//     password: '',
//     email: '',
//     phone: '',
//     address: '',
//   },
//   loading: false,
//   error: null,
// };

// interface DataState {
//   data: any;
//   loading: boolean;
//   error: string | null;
// }

const initialState: UserState = {
  user: {
    name: '',
    userName: '',
    password: '',
    email: '',
    phone: '',
    address: '',
  },
  loading: false,
  error: null,
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
