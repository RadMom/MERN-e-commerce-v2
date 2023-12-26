import React from "react";
import classes from "./CartList.module.css";
import CartProduct from "./CartProduct";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cart/cartSlice";

const CartList = (props) => {
    console.log(props.products);
    const dispatch = useDispatch(); // Hook to dispatch actions

    // Handler to clear the entire cart
    const clearCartHandler = () => {
        dispatch(clearCart()); // Dispatching the clearCart action
    };

    return (
        <div className={classes.cart}>
            <div>
                {/* List of cart items */}
                <ul className={classes.cartItems}>
                    {props.cart.cartItems.map((product) => (
                        <li key={product.id}>
                            {/* Display each individual cart product */}
                            <CartProduct product={product} />
                        </li>
                    ))}
                </ul>
                {/* Total price of items in the cart */}
                <p>Total Price: {props.cart.totalPrice}</p>
                {/* Button to clear the cart */}
                <button onClick={clearCartHandler}>Clear Cart</button>
            </div>
            <div>
                {/* NavLink to navigate to the order page */}
                <NavLink to="/order">Next</NavLink>
            </div>
        </div>
    );
};

export default CartList;
