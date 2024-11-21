import { createSlice } from "@reduxjs/toolkit";

const patientServiceSlice = createSlice({
  name: "patientService",
  initialState: {
    patientServices: [],
  },
  reducers: {
    addPatientService: (state, action) => {
      state.patientServices.push(action.payload);
    },
    updatePatientService: (state, action) => {
      const index = state.patientServices.findIndex(
        (service) => service.id === action.payload.id
      );
      if (index !== -1) {
        state.patientServices[index] = action.payload;
      }
    },
    deletePatientService: (state, action) => {
      state.patientServices = state.patientServices.filter(
        (service) => service.id !== action.payload
      );
    },
  },
});

export const { addPatientService, updatePatientService, deletePatientService } = patientServiceSlice.actions;
export default patientServiceSlice.reducer;
