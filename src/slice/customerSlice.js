import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: [],
  loadding: false,
  error: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      state.customer = action.payload;
    },
  },
});

export const { addCustomer } = customerSlice.actions;
export default customerSlice.reducer;