import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/products/productsApi"; // Importing the action creator for fetching products
import Pagination from "../components/Pagination";
import ProductsList from "../components/products/ProductsList";
import FiltersOptionsTable from "../components/navs&footer/FiltersOptionsTable";

function ProductsPage() {
    console.log("ProductsPage");

    const dispatch = useDispatch(); // Hook to dispatch actions
    const productsData = useSelector((state) => state.products); // Accessing products state from Redux store
    const products = productsData.products; // Extracting products array from state
    const productsPagination = productsData.pagination; // Extracting pagination info from state

    useEffect(() => {
        console.log("USEEFFECT");
        // Fetch products when the component mounts or pagination changes
        dispatch(getProducts(null, productsPagination.currentPage)); // Dispatching the action to get products
    }, [dispatch]); // Dependency on dispatch and current page

    const handlePageChange = (page) => {
        console.log(page);
        // Function to handle page change in pagination
        dispatch(getProducts(null, page)); // Dispatching the action to get products for a specific page
    };

    return (
        <div>
            {/* Filtering options */}
            <FiltersOptionsTable />

            {/* List of products */}
            {products ? <ProductsList products={products} /> : <p>No products available.</p>}

            {/* Pagination component */}
            <Pagination
                totalPages={productsPagination.totalPages}
                currentPage={productsPagination.currentPage}
                onPageChange={handlePageChange} // Handling page change callback
            />
        </div>
    );
}

export default ProductsPage;
