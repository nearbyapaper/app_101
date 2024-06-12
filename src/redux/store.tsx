import {configureStore} from '@reduxjs/toolkit';
import {counterReducer} from './reducers/counter-reducer';
import {dailyMissionReducer} from './reducers/daily-reducer';
import userReducer from './reducers/user-reducer';
import taskReducer from './reducers/task-reducer';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    dailyMission: dailyMissionReducer,
    task: taskReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
