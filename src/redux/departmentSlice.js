import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  departments: [], 
};

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    addDepartment: (state, action) => {
      state.departments.push(action.payload);
    },
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
    updateDepartment: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.departments.findIndex((dept) => dept.id === id);
      if (index !== -1) {
        state.departments[index] = { ...state.departments[index], ...updatedData };
      }
    },

    deleteDepartment: (state, action) => {
      state.departments = state.departments.filter(
        (dept) => dept.id !== action.payload
      );
    },
  },
});


export const { addDepartment, setDepartments, updateDepartment, deleteDepartment } =
  departmentSlice.actions;
export default departmentSlice.reducer;
