import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../redux/products/productsApi";
import classes from "./ProductDetailsPage.module.css";

function ProductDetailsPage() {
    console.log("PRODUCT DETAILS PAGE");

    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            try {
                const product = await getSingleProduct(productId);
                setProduct(product);
                setIsLoading(false);
            } catch (error) {
                setError(error.message || "An unexpected error occurred");
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    console.log(product);
    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div>
                    <div className={classes.container}>
                        <div className={classes.imageContainer}>
                            <img
                                src="https://res.cloudinary.com/dpu2uuhyh/image/upload/v1703325125/donkey_qcdayt.jpg"
                                alt={product.title}
                                className={classes.image}
                            />
                        </div>
                        <div className={classes.detailsContainer}>
                            <h2 className={classes.title}>{product.title}</h2>
                            <p className={classes.category}>Category: {product.category}</p>
                            <p className={classes.description}>
                                Description: {product.description}
                            </p>
                            <p className={classes.price}>Price: ${product.price}</p>
                            <p className={classes.stock}>Stock: {product.stock}</p>
                            <p className={classes.newProduct}>
                                {product.productIsNew ? "New Product" : ""}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetailsPage;
