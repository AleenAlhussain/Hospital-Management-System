import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  services: [],
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    addService: (state, action) => {
      state.services.push(action.payload);
    },
    updateService: (state, action) => {
      const index = state.services.findIndex(service => service.id === action.payload.id);
      if (index !== -1) {
        state.services[index] = { ...state.services[index], ...action.payload };
      }
    },
    deleteService: (state, action) => {
      state.services = state.services.filter(service => service.id !== action.payload);
    },

  },
});

export const { addService, updateService, deleteService } = serviceSlice.actions;
export default serviceSlice.reducer;
