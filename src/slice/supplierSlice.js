import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  supplier: [],
  loadding: false,
  error: null,
};

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    addSupplier: (state, action) => {
      state.supplier = action.payload;
    },
  },
});

export const { addSupplier } = supplierSlice.actions;
export default supplierSlice.reducer;