import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import drawerReducer from "./drawerSlice";
import shortsReducer from "./shortSlice";
import navReducer from "./navSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    drawer: drawerReducer,
    navbar:navReducer,
    shorts: shortsReducer,
  },
});