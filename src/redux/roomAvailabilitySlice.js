import { createSlice } from "@reduxjs/toolkit";

const roomAvailabilitySlice = createSlice({
  name: "roomAvailability",
  initialState: {
    roomAvailabilityRecords: [],
  },
  reducers: {
    addRoomAvailability: (state, action) => {
      state.roomAvailabilityRecords.push(action.payload);
    },
    updateRoomAvailability: (state, action) => {
      const index = state.roomAvailabilityRecords.findIndex(
        (record) => record.id === action.payload.id
      );
      if (index !== -1) {
        state.roomAvailabilityRecords[index] = action.payload;
      }
    },
    deleteRoomAvailability: (state, action) => {
      state.roomAvailabilityRecords = state.roomAvailabilityRecords.filter(
        (record) => record.id !== action.payload
      );
    },
  },
});

export const {
  addRoomAvailability,
  updateRoomAvailability,
  deleteRoomAvailability,
} = roomAvailabilitySlice.actions;
export default roomAvailabilitySlice.reducer;
