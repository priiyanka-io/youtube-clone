import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
  name: "navbar",
  initialState: {
    search:"",
    showSuggestions:false,
    debouncedSearch:"",
   
  },

  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setShowSuggestions: (state, action) => {
      state.showSuggestions = action.payload;
    },
    setDebouncedSearch: (state, action) => {
      state.debouncedSearch = action.payload;
    },  
  },
});

export const {  setSearch} = navSlice.actions;
export const {   setShowSuggestions} = navSlice.actions;
export const {  setDebouncedSearch} = navSlice.actions;
export default navSlice.reducer;