import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import userReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: { products: productsReducer ,
    user: userReducer,
  },
});
