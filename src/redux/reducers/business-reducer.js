import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentBusiness: {},
  saveBusinessLoading: false,
  saveBusinessError: null,
};

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    saveBusiness: (state, action) => {
      state.saveBusinessLoading = false;
      state.saveBusinessError = null;
      state.currentBusiness = action.payload;
    },
    loadBusinessStart: state => {
      state.saveBusinessLoading = true;
      state.saveBusinessError = null;
      state.currentBusiness = {};
    },
    loadBusinessError: (state, action) => {
      state.saveBusinessLoading = false;
      state.saveBusinessError = action.payload;
      state.currentBusiness = {};
    },
  },
});

export const {saveBusiness, loadBusinessStart, loadBusinessError} =
  businessSlice.actions;

// Make sure the reducer is exported as default
export default businessSlice.reducer;
