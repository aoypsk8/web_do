import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productedit: [],
  loadding: false,
  error: null,
};

const productEditSlice = createSlice({
  name: "productedit",
  initialState,
  reducers: {
    addProductEdit: (state, action) => {
      state.productedit = action.payload;
    },
  },
});

export const { addProductEdit } = productEditSlice.actions;
export default productEditSlice.reducer;