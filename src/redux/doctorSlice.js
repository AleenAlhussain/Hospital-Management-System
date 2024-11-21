import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doctors: [],
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    addDoctor: (state, action) => {
      state.doctors.push(action.payload);
    },
    updateDoctorSchedule: (state, action) => {
      const index = state.doctors.findIndex((doc) => doc.id === action.payload.id);
      if (index !== -1) {
        state.doctors[index] = { ...state.doctors[index], ...action.payload };
      }
    },
    deleteDoctor: (state, action) => {
      state.doctors = state.doctors.filter((doc) => doc.id !== action.payload);
    },
    setDoctors: (state, action) => {
      state.doctors = action.payload;
    },
  },
});

export const { addDoctor, updateDoctorSchedule, deleteDoctor, setDoctors } = doctorSlice.actions;
export default doctorSlice.reducer;
