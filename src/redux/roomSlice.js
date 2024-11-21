import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: [],
  loading: false,
  error: null,
  startDate: '',
  endDate: '',
};

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    addRoom: (state, action) => {
      const { id, type, status, size, number, date, departmentId } = action.payload; 
      state.rooms.push({ id, type, status, size, number, date, departmentId });
    },
    updateRoom: (state, action) => {
      const { id, type, status, size, number, date, departmentId } = action.payload;
      const roomIndex = state.rooms.findIndex((room) => room.id === id);
      if (roomIndex !== -1) {
        state.rooms[roomIndex] = { id, type, status, size, number, date, departmentId };
      }
    },
    removeRoom: (state, action) => {
      state.rooms = state.rooms.filter((room) => room.id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    updateRoomStatus: (state, action) => {
      const { id, status } = action.payload;
      const roomIndex = state.rooms.findIndex((room) => room.id === id);
      if (roomIndex !== -1) {
        state.rooms[roomIndex].status = status;
      }
    },
    resetRooms: (state) => {
      state.rooms = [];
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    resetDates: (state) => {
      state.startDate = '';
      state.endDate = '';
    },
  },
});

export const {
  addRoom,
  updateRoom,
  removeRoom,
  setError,
  setLoading,
  setRooms,
  updateRoomStatus,
  resetRooms,
  setStartDate,
  setEndDate,
  resetDates
} = roomSlice.actions;

export const selectRooms = (state) => state.rooms.rooms;
export const selectStartDate = (state) => state.rooms.startDate;
export const selectEndDate = (state) => state.rooms.endDate;

export default roomSlice.reducer;
