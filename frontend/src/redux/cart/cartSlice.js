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

            const newItem = action.payload;
            console.log(newItem);
            const existingItem = state.cartItems.find((item) => item.id === newItem.id);

            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    title: newItem.title,
                    price: Number(newItem.price),
                    quantity: 1,
                    maxQuantity: newItem.stock,
                    totalPriceForItem: Number(newItem.price),
                });
                state.totalPrice += Number(newItem.price);
            } else {
                if (existingItem.maxQuantity <= existingItem.quantity) {
                    // state.error = "maxQuantity" + existingItem.maxQuantity;
                    return;
                }
                existingItem.quantity++;
                existingItem.totalPriceForItem =
                    existingItem.totalPriceForItem + Number(newItem.price);
                state.totalPrice += Number(newItem.price);
            }
            state.totalQuantity++;
        },
        subtractFromCart(state, action) {
            console.log(action.payload);

            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);
            state.totalQuantity--;

            if (existingItem.quantity === 1) {
                state.products = state.cartItems.filter((item) => item.id !== id); //return an array with products with !==ids
                state.totalPrice -= Number(existingItem.price);
            } else {
                existingItem.quantity--;
                existingItem.totalPriceForItem =
                    existingItem.totalPriceForItem - Number(existingItem.price);
                state.totalPrice -= Number(existingItem.price);
            }
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
