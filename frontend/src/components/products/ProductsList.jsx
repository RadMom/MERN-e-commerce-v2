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
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [showModal, setShowModal] = useState(false);
    const products = props.products;
    const error = props.error;

    const addToCartHandler = (product) => {
        console.log(product);
        if (!userInfo) {
            setShowModal(true);
            return;
        }
        const productInfo = {
            id: product._id,
            title: product.title,
            price: product.price,
            stock: product.stock,
        };
        dispatch(addToCart(productInfo));
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            {showModal && (
                <Modal closeModal={closeModal}>
                    <Login closeModal={closeModal} />
                </Modal>
            )}

            <div className={classes.list}>
                {products ? (
                    products.map((product) => (
                        <div key={product._id} className={classes["product-card"]}>
                            <header className={classes["product-header"]}>
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
                                <p className={classes.price}>${product.price}</p>
                                <p className={classes.stock}>Stock: {product.stock}</p>
                            </div>
                            <div className={classes.actions}>
                                <button
                                    onClick={() => addToCartHandler(product)}
                                    disabled={product.stock == 0}
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
