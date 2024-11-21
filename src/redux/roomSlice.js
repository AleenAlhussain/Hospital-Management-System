import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: [],
};

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    addRoom: (state, action) => {
      state.rooms.push(action.payload);
    },
    updateRoom: (state, action) => {
      const index = state.rooms.findIndex((doc) => doc.id === action.payload.id);
      if (index !== -1) {
        state.rooms[index] = { ...state.rooms[index], ...action.payload };
      }
    },
    removeRoom: (state, action) => {
      state.rooms = state.rooms.filter((room) => room.id !== action.payload);
    },
  },
});

export const {
  addRoom,
  updateRoom,
  removeRoom,
} = roomSlice.actions;



export default roomSlice.reducer;
