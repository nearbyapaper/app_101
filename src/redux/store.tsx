import {configureStore} from '@reduxjs/toolkit';
import {counterReducer} from './reducers/counter-reducer';
import {dailyMissionReducer} from './reducers/daily-reducer';
import {taskReducer} from './reducers/task-reducer';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    dailyMission: dailyMissionReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
