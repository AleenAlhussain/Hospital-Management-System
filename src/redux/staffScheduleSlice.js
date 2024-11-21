import { createSlice } from "@reduxjs/toolkit";

const staffScheduleSlice = createSlice({
  name: "staffSchedule",
  initialState: {
    staffSchedules: [],
  },
  reducers: {
    addStaffSchedule: (state, action) => {
      state.staffSchedules.push(action.payload);
    },
    updateStaffSchedule: (state, action) => {
      const index = state.staffSchedules.findIndex(
        (schedule) => schedule.id === action.payload.id
      );
      if (index !== -1) {
        state.staffSchedules[index] = action.payload;
      }
    },
    deleteStaffSchedule: (state, action) => {
      state.staffSchedules = state.staffSchedules.filter(
        (schedule) => schedule.id !== action.payload
      );
    },
  },
});

export const { addStaffSchedule, updateStaffSchedule, deleteStaffSchedule } =
  staffScheduleSlice.actions;
export default staffScheduleSlice.reducer;
