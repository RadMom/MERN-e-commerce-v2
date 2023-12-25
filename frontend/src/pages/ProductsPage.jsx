import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/products/productsApi";
import Pagination from "../components/Pagination";
import ProductsList from "../components/products/ProductsList";
import FiltersOptionsTable from "../components/navs&footer/FiltersOptionsTable";

function ProductsPage() {
    console.log("ProductsPage");
    const dispatch = useDispatch();
    const productsData = useSelector((state) => state.products);
    const products = productsData.products;
    const productsPagination = productsData.pagination;
    console.log(productsPagination);

    useEffect(() => {
        dispatch(getProducts(null, productsPagination.currentPage));
    }, []);

    const handlePageChange = (page) => {
        dispatch(getProducts(null, page));
    };

    return (
        <div>
            <FiltersOptionsTable />
            <ProductsList products={products} />
            <Pagination
                totalPages={productsPagination.totalPages}
                currentPage={productsPagination.currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default ProductsPage;
