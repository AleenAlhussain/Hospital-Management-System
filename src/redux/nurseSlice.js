import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nurses: [],
};

const nurseSlice = createSlice({
  name: "nurse",
  initialState,
  reducers: {
    addNurse: (state, action) => {
      state.nurses.push(action.payload);
    },
    updateNurse: (state, action) => {
      const index = state.nurses.findIndex((nurse) => nurse.id === action.payload.id);
      if (index !== -1) {
        state.nurses[index] = action.payload;
      }
    },
    deleteNurse: (state, action) => {
      state.nurses = state.nurses.filter((nurse) => nurse.id !== action.payload);
    },
  },
});


export const { addNurse, updateNurse, deleteNurse } = nurseSlice.actions;

export default nurseSlice.reducer;
