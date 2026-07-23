import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import uiReducer from "../features/ui/uiSlice";
import { productsApi } from "../services/productApi";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        ui: uiReducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


