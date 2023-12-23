import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth/authSlice";
import cartSlice from "./cart/cartSlice";
import productsSlice from "./products/productsSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        products: productsSlice,
        cart: cartSlice,
    },
});

export default store;
