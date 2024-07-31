import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: [],
  loadding: false,
  error: null,
};

const typeSlice = createSlice({
  name: "type",
  initialState,
  reducers: {
    addType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { addType } = typeSlice.actions;
export default typeSlice.reducer;