import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "@/features/products/productsSlice";
import { productsApi } from "@/services/productsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@/services/authApi";
import userSlice from "@/features/auth/userSlice";

export const store = configureStore({
  reducer: {

    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    products: productsSlice,
    user: userSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch)