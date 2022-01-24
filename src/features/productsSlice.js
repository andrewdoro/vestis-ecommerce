import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commerce } from "../lib/commerce";
const initialState = { products: [], loading: false };

export const getProducts = createAsyncThunk("products/getProducts", async () => {
   const { data } = await commerce.products.list();
   return data;
});

export const productsSlice = createSlice({
   name: "products",
   initialState,
   reducers: {},
   extraReducers: {
      [getProducts.pending]: (state,) => {
         state.loading = true;
      },
      [getProducts.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.products = payload;
      },
   },
});
export default productsSlice.reducer;
