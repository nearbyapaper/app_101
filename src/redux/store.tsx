import {configureStore} from '@reduxjs/toolkit';
import usersReducer from './user/userSlice';
import {counterReducer} from './reducers/counter-reducer';

const store = configureStore({
  reducer: {
    users: usersReducer,
    counter: counterReducer,
  },
});

export default store;
