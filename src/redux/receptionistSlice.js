import { createSlice } from "@reduxjs/toolkit";

const receptionistSlice = createSlice({
  name: "receptionist",
  initialState: {
    receptionists: [],
  },
  reducers: {
    addReceptionist: (state, action) => {
      state.receptionists.push(action.payload);
    },
    updateReceptionist: (state, action) => {
      const index = state.receptionists.findIndex(
        (receptionist) => receptionist.id === action.payload.id
      );
      if (index !== -1) {
        state.receptionists[index] = action.payload;
      }
    },
    deleteReceptionist: (state, action) => {
      state.receptionists = state.receptionists.filter(
        (receptionist) => receptionist.id !== action.payload
      );
    },
  },
});

export const { addReceptionist, updateReceptionist, deleteReceptionist } = receptionistSlice.actions;
export default receptionistSlice.reducer;
