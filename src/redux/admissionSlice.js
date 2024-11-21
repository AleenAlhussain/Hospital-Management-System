import { createSlice } from "@reduxjs/toolkit";

const admissionSlice = createSlice({
  name: "admission",
  initialState: {
    admissions: [],
  },
  reducers: {
    addAdmission: (state, action) => {
      state.admissions.push(action.payload);
    },
    updateAdmission: (state, action) => {
      const index = state.admissions.findIndex(
        (admission) => admission.id === action.payload.id
      );
      if (index !== -1) {
        state.admissions[index] = action.payload;
      }
    },
    deleteAdmission: (state, action) => {
      state.admissions = state.admissions.filter(
        (admission) => admission.id !== action.payload
      );
    },
  },
});

export const { addAdmission, updateAdmission, deleteAdmission } = admissionSlice.actions;
export default admissionSlice.reducer;
