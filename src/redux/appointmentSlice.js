import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    appointments: [],
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);
    },
    updateAppointment: (state, action) => {
      const index = state.appointments.findIndex((doc) => doc.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = { ...state.appointments[index], ...action.payload };
      }
    },
    deleteAppointment: (state, action) => {
      state.appointments = state.appointments.filter((doc) => doc.id !== action.payload);
    },
    setAppointment: (state, action) => {
      state.appointments = action.payload;
    },
  },
});

export const { addAppointment, updateAppointment, deleteAppointment, setAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
