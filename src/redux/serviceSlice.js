import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  services: [],
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    addService: (state, action) => {
      const newService = {
        id: uuidv4(),
        ...action.payload,
      };
      state.services.push(newService);
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
    setService: (state, action) => {
      state.services = action.payload;
    },
  },
});

export const selectServiceById = (state, serviceId) =>
  state.service.services.find(service => service.id === serviceId);

export const { addService, updateService, deleteService, setService } = serviceSlice.actions;
export default serviceSlice.reducer;
