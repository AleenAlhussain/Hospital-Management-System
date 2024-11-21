import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patients: [],
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    addPatient: (state, action) => {
      state.patients.push(action.payload);
    },
    updatePatient: (state, action) => {
      const index = state.patients.findIndex(patient => patient.id === action.payload.id);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
    },
    removePatient: (state, action) => {
      state.patients = state.patients.filter(patient => patient.id !== action.payload);
    },
  },
});


export const { addPatient, updatePatient, removePatient } = patientSlice.actions;

export default patientSlice.reducer;
