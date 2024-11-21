import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({
    name: "auth",
    initialState: {
      user: null,
      isAuthenticated: false,
      error: null,
    },
    reducers: {
      loginStart: (state) => {
        state.error = null;
      },
      loginSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      },
      loginFailure: (state, action) => {
        state.error = action.payload;
      },
      registerStart: (state) => {
        state.error = null;
      },
      registerSuccess: (state) => {
        state.error = null;
      },
      registerFailure: (state, action) => {
        state.error = action.payload;
      },
      logout: (state) => {
        state.isAuthenticated = false;
        state.user = null;
      },
    },
  });
  
  export const {
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    logout,
  } = authSlice.actions;
  
  export default authSlice.reducer;
  