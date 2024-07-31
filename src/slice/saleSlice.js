import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sale: [],
  loadding: false,
  error: null,
};

const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    addSale: (state, action) => {
      state.sale = action.payload;
    },
  },
});

export const { addSale } = saleSlice.actions;
export default saleSlice.reducer;