import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "@/features/products/productsSlice";
import { productsApi } from "@/services/productsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@/services/authApi";

export const store = configureStore({
  reducer: {

    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    productsR: productsSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch)