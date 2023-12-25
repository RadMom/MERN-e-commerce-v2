import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, subtractFromCart, removeFromCart } from "../../redux/cart/cartSlice";

import classes from "./CartProduct.module.css";

const CartProduct = (props) => {
    console.log(props);
    // TO DO LIST FOR THIS COMPONENT:
    // 1. if product.stock==0 => disable add button
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    console.log(products);

    const subtractProductHandler = (id) => {
        dispatch(subtractFromCart(id));
    };

    const addProductHandler = (product) => {
        dispatch(addToCart(product));
    };

    const removeProductHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <table className={classes.cartproduct}>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className={classes.image}>
                        <img src="https://res.cloudinary.com/dpu2uuhyh/image/upload/v1703325125/donkey_qcdayt.jpg" />
                    </td>
                    <td className={classes.name}>
                        <p>{props.product.title}</p>
                    </td>
                    <td className={classes.quantity}>
                        <div className={classes.buttons}>
                            <button
                                className={classes["btn-decrement"]}
                                onClick={() => subtractProductHandler(props.product.id)}
                            >
                                -
                            </button>
                            <p>
                                {props.product.quantity > props.product.stock
                                    ? props.product.stock
                                    : props.product.quantity}
                            </p>
                            <button
                                disabled={props.product.quantity >= props.product.maxQuantity}
                                className={classes["btn-increment"]}
                                onClick={() => addProductHandler(props.product)}
                            >
                                +
                            </button>
                        </div>
                        <button onClick={() => removeProductHandler(props.product.id)}>
                            Remove
                        </button>
                    </td>
                    <td className={classes.price}>
                        <p>{props.product.price}</p>
                        <p>Total price for product: {props.product.totalPriceForItem}</p>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default CartProduct;
