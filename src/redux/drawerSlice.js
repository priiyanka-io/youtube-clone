import { createSlice } from "@reduxjs/toolkit";

const drawerSlice = createSlice({
  name: "drawer",
  initialState: {
    open:false,
  },
  reducers: {
    
   setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = drawerSlice.actions;
export default drawerSlice.reducer;