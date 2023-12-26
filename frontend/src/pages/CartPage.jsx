import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartList from "../components/cart/CartList"; // Importing the CartList component to display cart items

function CartPage() {
    const dispatch = useDispatch(); // Hook to dispatch actions
    const cart = useSelector((state) => state.cart); // Accessing cart state from Redux store
    console.log(cart); // Logging the cart state for debugging purposes

    return (
        <div>
            {/* Conditional rendering based on whether the cart has items */}
            {cart?.cartItems?.length > 0 ? <CartList cart={cart} /> : <p>No items in the cart</p>}
        </div>
    );
}

export default CartPage;
