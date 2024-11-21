import { configureStore } from '@reduxjs/toolkit';
import departmentReducer from './departmentSlice';
import roomReducer from './roomSlice';
import doctorReducer from './doctorSlice';
import authReducer from './authSlice'
import serviceReducer from './serviceSlice';
import patientReducer from './patientSlice';

export const store = configureStore({
  reducer: {
     department: departmentReducer,
    room: roomReducer,
    doctor: doctorReducer,
    auth: authReducer,services: serviceReducer,
    patients: patientReducer,
  },
});

