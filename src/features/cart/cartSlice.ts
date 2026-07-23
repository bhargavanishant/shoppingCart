import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/categories";

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addToCart(state, action: PayloadAction<Product>) {
            const existingItem = state.items.find(
                item => item.id === action.payload.id
            );

            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1
                });
            }
        },

        removeFromCart(state, action: PayloadAction<number>) {
            state.items = state.items.filter(
                item => item.id !== action.payload
            );
        },

        increment(state, action: PayloadAction<number>) {
            const item = state.items.find(
                item => item.id === action.payload
            );

            if (item) {
                item.quantity++;
            }
        },

        decrement(state, action: PayloadAction<number>) {
            const item = state.items.find(
                item => item.id === action.payload
            );

            if (item && item.quantity > 1) {
                item.quantity--;
            }
        },

        clearCart(state) {
            state.items = [];
        }
    }
});

export const {
    addToCart,
    removeFromCart,
    increment,
    decrement,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;