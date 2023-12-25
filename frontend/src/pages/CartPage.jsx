import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartList from "../components/cart/CartList";

function CartPage() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    console.log(cart);

    return (
        <div>
            {cart.cartItems.length > 0 ? <CartList cart={cart} /> : <p>No items in the cart</p>}
        </div>
    );
}

export default CartPage;
