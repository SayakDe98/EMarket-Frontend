import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: { searchPdt: "" },
  reducers: {
    search(state, action) {
      state.searchPdt = action.payload.searchItem;
      localStorage.setItem("Search Item", state.searchPdt);
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice;
