import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./ProductsList.module.css";

import { addToCart } from "../../redux/cart/cartSlice";

//components
import Modal from "../Modal";
import Login from "../login&signup/Login";

const ProductsList = (props) => {
    console.log(props);

    const dispatch = useDispatch(); // Hook to dispatch actions
    const { userInfo } = useSelector((state) => state.auth); // Accessing user information from Redux store
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility
    const products = props.products; // Products array passed as props
    const error = props.error; // Error state if any

    // Function to handle adding items to the cart
    const addToCartHandler = (product) => {
        console.log(product);

        // Check if user is logged in, show modal if not
        if (!userInfo) {
            setShowModal(true);
            return;
        }

        // If user is logged in, prepare product information and dispatch addToCart action
        const productInfo = {
            id: product._id,
            title: product.title,
            price: product.price,
            stock: product.stock,
        };
        dispatch(addToCart(productInfo));
    };

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            {showModal && (
                // Show Login modal if showModal is true
                <Modal closeModal={closeModal}>
                    <Login closeModal={closeModal} />
                </Modal>
            )}

            <div className={classes.list}>
                {products ? (
                    // Render products if available
                    products.map((product) => (
                        <div key={product._id} className={classes["product-card"]}>
                            <header className={classes["product-header"]}>
                                {/* Link to product details page */}
                                <NavLink to={`${product._id}`}>
                                    <h2>{product.title}</h2>
                                    <img
                                        className={classes.image}
                                        src="https://res.cloudinary.com/dpu2uuhyh/image/upload/v1703325125/donkey_qcdayt.jpg"
                                        alt="image"
                                    />
                                </NavLink>
                            </header>
                            <div className={classes["price-and-stock"]}>
                                {/* Product price and stock */}
                                <p className={classes.price}>${product.price}</p>
                                <p className={classes.stock}>Stock: {product.stock}</p>
                            </div>
                            <div className={classes.actions}>
                                {/* Add to cart button */}
                                <button
                                    onClick={() => addToCartHandler(product)}
                                    disabled={product.stock === 0} // Disable button if product is out of stock
                                    className={product.stock > 0 ? "btn-active" : "btn-inactive"}
                                >
                                    {product.stock > 0 ? "Add to cart" : "Out of stock"}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Products</p>
                )}
            </div>
        </div>
    );
};

export default ProductsList;
