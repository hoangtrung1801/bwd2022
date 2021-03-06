import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { ItemCart } from "../../utils/types/ItemCart";
import { Product } from "../../utils/types/Product";

interface CartState {
    items: ItemCart[];
}

const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (
            state: CartState,
            action: PayloadAction<{ product: Product; amount: number }>
        ) => {
            if (
                state.items.findIndex(
                    (el: ItemCart) => el.product.id == action.payload.product.id
                ) >= 0
            ) {
                state.items.find(
                    (e: ItemCart) => e.product.id === action.payload.product.id
                )!.amount += action.payload.amount;
            } else {
                state.items.push({
                    product: action.payload.product,
                    amount: action.payload.amount,
                });
            }
        },
        removeFromCart: (state: CartState, action: PayloadAction<Product>) => {
            const idx = state.items.findIndex(
                (item: ItemCart) => item.product.id === action.payload.id
            );
            state.items[idx].amount = Math.max(state.items[idx].amount - 1, 0);
        },
        removeProductFromCart: (state: any, action: PayloadAction<Product>) => {
            const idx = state.items.findIndex(
                (item: ItemCart) => item.product.id === action.payload.id
            );
            state.items = [
                ...state.items.slice(0, idx),
                ...state.items.slice(idx + 1),
            ];
        },
    },
});

export const { addToCart, removeFromCart, removeProductFromCart } =
    cartSlice.actions;
export default cartSlice.reducer;
