

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  medicalRecords: [],
};

const medicalRecordSlice = createSlice({
  name: 'medicalRecord',
  initialState,
  reducers: {
    addMedicalRecord: (state, action) => {
      state.medicalRecords.push(action.payload);
    },
    updateMedicalRecord: (state, action) => {
      const index = state.medicalRecords.findIndex(record => record.id === action.payload.id);
      if (index !== -1) {
        state.medicalRecords[index] = action.payload;
      }
    },
    deleteMedicalRecord: (state, action) => {
      state.medicalRecords = state.medicalRecords.filter(record => record.id !== action.payload);
    },
  },
});


export const { addMedicalRecord, updateMedicalRecord, deleteMedicalRecord } = medicalRecordSlice.actions;


export default medicalRecordSlice.reducer;
