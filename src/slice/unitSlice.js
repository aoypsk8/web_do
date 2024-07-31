import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unit: [],
  loadding: false,
  error: null,
};

const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    addUnit: (state, action) => {
      state.unit = action.payload;
    },
  },
});

export const { addUnit } = unitSlice.actions;
export default unitSlice.reducer;