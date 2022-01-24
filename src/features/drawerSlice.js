import { createSlice } from "@reduxjs/toolkit";

export const drawerSlice = createSlice({
   name: "drawer",
   initialState: { open: false },
   reducers: {
      setOpen: (state) => {
         state.open = true;
      },
      setClose: (state) => {
         state.open = false;
      },
   },
});
export const { setOpen, setClose } = drawerSlice.actions;
export const getDrawer = (state) => state.drawer.open;
export default drawerSlice.reducer;
