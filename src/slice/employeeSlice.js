import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employee: [],
  loadding: false,
  error: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employee = action.payload;
    },
  },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;