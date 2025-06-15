import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import filterReducer from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
