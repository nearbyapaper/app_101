import {configureStore} from '@reduxjs/toolkit';
import businessReducer from '../redux/reducers/business-reducer';

const store = configureStore({
  reducer: {
    business: businessReducer, // Make sure this is the correct reducer
  },
});

export default store;
