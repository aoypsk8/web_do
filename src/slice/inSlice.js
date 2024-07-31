import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ins: [],
  loadding: false,
  error: null,
};

const inSlice = createSlice({
  name: "ins",
  initialState,
  reducers: {
    addIn: (state, action) => {
      state.ins = action.payload;
    },
  },
});

export const { addIn } = inSlice.actions;
export default inSlice.reducer;