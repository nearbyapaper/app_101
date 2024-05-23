import {configureStore} from '@reduxjs/toolkit';
import {counterReducer} from './reducers/counter-reducer';
import {dailyMissionReducer} from './reducers/daily-reducer';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    dailyMission: dailyMissionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
