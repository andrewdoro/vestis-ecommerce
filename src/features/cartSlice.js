import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { commerce } from '../lib/commerce';
const initialState = { cart: { line_items: [] }, loading: true };

export const getCart = createAsyncThunk('cart/getCart', async () => {
  const res = await commerce.cart.retrieve();
  return res;
});
export const addItem = createAsyncThunk(
  'cart/addItem',
  async ({ productId, variant }) => {
    const res = await commerce.cart.add(productId, 1, variant);
    return res.cart;
  }
);
export const removeItem = createAsyncThunk(
  'cart/removeItem',
  async (lineItemId) => {
    const res = await commerce.cart.remove(lineItemId);
    return res.cart;
  }
);
export const emptyCart = createAsyncThunk('cart/emptyCart', async () => {
  const res = await commerce.cart.empty();
  return res.cart;
});
export const refreshCart = createAsyncThunk('cart/refreshCart', async () => {
  const res = await commerce.cart.refresh();
  return res;
});
export const updateQuantity = createAsyncThunk(
  'cart/updateQt',
  async ({ lineItemId, qt }) => {
    const res = await commerce.cart.update(lineItemId, { quantity: qt });
    return res;
  }
);
export const cartSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    [getCart.pending]: (state) => {
      state.loading = true;
    },
    [getCart.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.cart = payload;
    },
    [addItem.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.cart = payload;
    },
    [removeItem.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.cart = payload;
    },
    [emptyCart.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.cart = payload;
    },
    [refreshCart.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.cart = payload;
    },
    [updateQuantity.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.cart = payload.cart;
    },
  },
});
export default cartSlice.reducer;
