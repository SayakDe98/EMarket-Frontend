import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    cartId: "",
  },
  reducers: {
    loggedIn(state, action) {
      state.isLoggedIn = !state.isLoggedIn;
      console.log("loggedIn(state)=true");
      if (state.isLoggedIn) {
        localStorage.setItem("isLoggedIn", true);
        const cartId = action.payload.cartId;
        state.cartId = cartId;
        localStorage.setItem("cartId", state.cartId);
      } else if (!state.isLoggedIn) {
        localStorage.removeItem("isLoggedIn");
        cookies.remove("token", { path: "/" });
        localStorage.removeItem("cartId");
        localStorage.removeItem("userId");
        localStorage.removeItem("addrId");
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
