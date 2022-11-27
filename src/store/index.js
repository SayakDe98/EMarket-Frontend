import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import cartSlice from "./cart-slice";
import searchSlice from "./search-slice";
import refreshSlice from "./refresh-slice";
import categorySlice from "./category-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    search: searchSlice.reducer,
    refresh: refreshSlice.reducer,
    category: categorySlice.reducer,
  },
});

export default store;
