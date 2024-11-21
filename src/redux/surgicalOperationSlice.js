import { createSlice } from "@reduxjs/toolkit";

const surgicalOperationSlice = createSlice({
  name: "surgicalOperation",
  initialState: {
    surgicalOperations: [],
  },
  reducers: {
    addSurgicalOperation: (state, action) => {
      state.surgicalOperations.push(action.payload);
    },
    updateSurgicalOperation: (state, action) => {
      const index = state.surgicalOperations.findIndex(
        (operation) => operation.id === action.payload.id
      );
      if (index !== -1) {
        state.surgicalOperations[index] = action.payload;
      }
    },
    deleteSurgicalOperation: (state, action) => {
      state.surgicalOperations = state.surgicalOperations.filter(
        (operation) => operation.id !== action.payload
      );
    },
  },
});

export const { addSurgicalOperation, updateSurgicalOperation, deleteSurgicalOperation } = surgicalOperationSlice.actions;
export default surgicalOperationSlice.reducer;
