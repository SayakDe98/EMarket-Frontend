import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    products: {},
    selectedCategoryName: "",
    categorySelected: false,
  },
  reducers: {
    filterProducts(state, action) {
      state.products = action.payload.products;
      state.selectedCategoryName = action.payload.selectedCategoryName;
      state.categorySelected = true;
    },
    getAllProducts(state) {
      state.categorySelected = false;
    },
  },
});

export const categoryActions = categorySlice.actions;

export default categorySlice;
