import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
};
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    getValue(state, action) {
     state.searchValue=(action.payload);
    },
  },
});
export const { getValue } = searchSlice.actions;
export default searchSlice.reducer;
