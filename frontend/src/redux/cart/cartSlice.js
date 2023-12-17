import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            console.log(action.payload);
        },
        subtractFromCart(state, action) {
            console.log(action.payload);
        },
        removeFromCart(state, action) {
            console.log(action.payload);
        },
        clearCart(state, action) {
            console.log(action.payload);
        },
    },
});

export const { addToCart, subtractFromCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
