import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  outs: [],
  loadding: false,
  error: null,
};

const outSlice = createSlice({
  name: "outs",
  initialState,
  reducers: {
    addOut: (state, action) => {
      state.outs = action.payload;
    },
  },
});

export const { addOut } = outSlice.actions;
export default outSlice.reducer;