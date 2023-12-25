import React from "react";
import classes from "./CartList.module.css";
import CartProduct from "./CartProduct";
import { NavLink } from "react-router-dom";

const CartList = (props) => {
    return (
        <div className={classes.cart}>
            <div>
                <ul className={classes.cartItems}>
                    {props.cart.cartItems.map((product) => (
                        <li key={product.id}>
                            <CartProduct product={product} />
                        </li>
                    ))}
                </ul>
                <p>Total Price: {props.cart.totalPrice}</p>
            </div>
            <div>
                <NavLink to="/order">Next</NavLink>
            </div>
        </div>
    );
};

export default CartList;
