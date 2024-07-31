import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  importPro: [],
  loadding: false,
  error: null,
};

const importProSlice = createSlice({
  name: "importPro",
  initialState,
  reducers: {
    addImportPro: (state, action) => {
      state.importPro = action.payload;
    },
  },
});

export const { addImportPro } = importProSlice.actions;
export default importProSlice.reducer;