import {createSlice} from '@reduxjs/toolkit';
import {createUser, loginUser} from '../actions/user-action';
// import {User} from '../actions/user-action';
import {LoginUserResponse} from '../types/user-type';
export interface UserState {
  user: LoginUserResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createUser.pending, state => {
        console.log('call createUser Pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        console.log('call createUser Success :: ', action.payload);
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        console.log('call createUser Error :: ', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, state => {
        console.log('call LoginUser Pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('call LoginUser Success data :: ', action.payload.data);
        state.loading = false;
        state.user = action.payload?.data;
        console.log('call LoginUser Success set state.user :: ', state.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('call LoginUser Error :: ', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
