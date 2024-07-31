import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderToday: [],
  loadding: false,
  error: null,
};

const orderTodaySlice = createSlice({
  name: "orderToday",
  initialState,
  reducers: {
    addOrderToday: (state, action) => {
      state.orderToday = action.payload;
    },
  },
});

export const { addOrderToday } = orderTodaySlice.actions;
export default orderTodaySlice.reducer;