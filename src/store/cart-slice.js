import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartQty: 0 },
  reducers: {
    cartQty(state, action) {
      state.cartQty = state.cartQty + 1;
      console.log("Cart Qty increased by 1");
      localStorage.setItem("cart quantity", state.cartQty);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;