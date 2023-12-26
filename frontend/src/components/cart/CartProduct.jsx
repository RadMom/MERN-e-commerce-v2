import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, subtractFromCart, removeFromCart } from "../../redux/cart/cartSlice";
import classes from "./CartProduct.module.css";

const CartProduct = (props) => {
    console.log(props);

    const dispatch = useDispatch(); // Hook to dispatch actions
    const products = useSelector((state) => state.products); // Accessing products from Redux store
    console.log(products);

    // Function to subtract a product from the cart
    const subtractProductHandler = (id) => {
        dispatch(subtractFromCart(id)); // Dispatch subtractFromCart action with product ID
    };

    // Function to add a product to the cart
    const addProductHandler = (product) => {
        dispatch(addToCart(product)); // Dispatch addToCart action with the product
    };

    // Function to remove a product from the cart
    const removeProductHandler = (id) => {
        console.log(id);
        dispatch(removeFromCart(id)); // Dispatch removeFromCart action with product ID
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
                        <img
                            src="https://res.cloudinary.com/dpu2uuhyh/image/upload/v1703325125/donkey_qcdayt.jpg"
                            alt="product"
                        />
                    </td>
                    <td className={classes.name}>
                        <p>{props.product.title}</p>
                    </td>
                    <td className={classes.quantity}>
                        <div className={classes.buttons}>
                            {/* Button to decrease product quantity */}
                            <button
                                className={classes["btn-decrement"]}
                                onClick={() => subtractProductHandler(props.product.id)}
                            >
                                -
                            </button>
                            {/* Display product quantity */}
                            <p>
                                {props.product.quantity > props.product.stock
                                    ? props.product.stock
                                    : props.product.quantity}
                            </p>
                            {/* Button to increase product quantity */}
                            <button
                                disabled={props.product.quantity >= props.product.maxQuantity}
                                className={classes["btn-increment"]}
                                onClick={() => addProductHandler(props.product)}
                            >
                                +
                            </button>
                        </div>
                        {/* Button to remove the product from the cart */}
                        <button onClick={() => removeProductHandler(props.product.id)}>
                            Remove
                        </button>
                    </td>
                    <td className={classes.price}>
                        {/* Display product price and total price */}
                        <p>{props.product.price}</p>
                        <p>Total price for product: {props.product.totalPriceForItem}</p>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default CartProduct;
