import { createSlice } from "@reduxjs/toolkit";

const refreshSlice = createSlice({
  name: "refresh",
  initialState: { refresh: false },
  reducers: {
    refresh(state, action) {
      state.refresh = !state.refresh;
    },
  },
});

export const refreshActions = refreshSlice.actions;

export default refreshSlice;
