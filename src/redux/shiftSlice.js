import { createSlice } from "@reduxjs/toolkit";
const initialShifts = [
  { id: 1, name: "Morning", time: "06:00 - 12:00" },
  { id: 2, name: "Afternoon", time: "12:00 - 18:00" },
  { id: 3, name: "Evening", time: "18:00 - 00:00" },
  { id: 4, name: "Night", time: "00:00 - 06:00" },
];
const shiftSlice = createSlice({
  name: "shift",
  initialState: {
    shifts: initialShifts,
  },
  reducers: {
    addShift: (state, action) => {
      state.shifts.push(action.payload);
    },
    updateShift: (state, action) => {
      const index = state.shifts.findIndex(
        (shift) => shift.id === action.payload.id
      );
      if (index !== -1) {
        state.shifts[index] = action.payload;
      }
    },
    deleteShift: (state, action) => {
      state.shifts = state.shifts.filter((shift) => shift.id !== action.payload);
    },
  },
});

export const { addShift, updateShift, deleteShift } = shiftSlice.actions;
export default shiftSlice.reducer;
