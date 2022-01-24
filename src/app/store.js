import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../features/productsSlice";
import cartSlice from "../features/cartSlice";
import drawerSlice from "../features/drawerSlice";
export const store = configureStore({
   reducer: { products: productsSlice, cart: cartSlice, drawer: drawerSlice },
});
