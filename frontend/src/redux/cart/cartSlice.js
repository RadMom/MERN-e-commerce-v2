import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart
const initialState = {
    cartItems: [], // Array to hold items in the cart
    totalQuantity: 0, // Total quantity of items in the cart
    totalPrice: 0, // Total price of all items in the cart
};

// Create a slice for the cart management
const cartSlice = createSlice({
    name: "cart", // Name of the slice
    initialState, // Initial state defined above
    reducers: {
        addToCart(state, action) {
            // Action to add an item to the cart
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === newItem.id);

            if (!existingItem) {
                // If the item doesn't exist in the cart, add it
                state.cartItems.push({
                    id: newItem.id,
                    title: newItem.title,
                    price: Number(newItem.price), // Convert price to a number
                    quantity: 1,
                    maxQuantity: newItem.stock,
                    totalPriceForItem: Number(newItem.price), // Total price for this item
                });
                state.totalPrice += Number(newItem.price); // Add item price to total price
            } else {
                if (existingItem.maxQuantity <= existingItem.quantity) {
                    // Handle max quantity reached for an item
                    return;
                }
                existingItem.quantity++; // Increase quantity of existing item in cart
                existingItem.totalPriceForItem += Number(newItem.price); // Update total price for this item
                state.totalPrice += Number(newItem.price); // Add item price to total price
            }
            state.totalQuantity++; // Increase total quantity of items in cart
        },
        subtractFromCart(state, action) {
            // Action to subtract an item from the cart
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);
            state.totalQuantity--; // Decrease total quantity of items in cart

            if (existingItem.quantity === 1) {
                // If the quantity becomes 1, remove the item from the cart
                state.cartItems = state.cartItems.filter((item) => item.id !== id);
                state.totalPrice -= existingItem.price; // Subtract item price from total price
            } else {
                existingItem.quantity--; // Decrease quantity of existing item in cart
                existingItem.totalPriceForItem -= existingItem.price; // Update total price for this item
                state.totalPrice -= existingItem.price; // Subtract item price from total price
            }
        },
        removeFromCart(state, action) {
            // Action to completely remove an item from the cart
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);
            if (existingItem) {
                // If the item exists, remove it completely from the cart
                state.cartItems = state.cartItems.filter((item) => item.id !== id);
                state.totalPrice -= existingItem.totalPriceForItem; // Subtract total price for this item
                state.totalQuantity -= existingItem.quantity; // Subtract item quantity from total quantity
            }
        },
        clearCart(state, action) {
            // Action to clear the entire cart
            state.cartItems = []; // Reset cart items
            state.totalPrice = 0; // Reset total price
            state.totalQuantity = 0; // Reset total quantity
        },
    },
});

// Export actions and reducer from the slice
export const { addToCart, subtractFromCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
