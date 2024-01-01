import axios from "axios";
import { setError, setIsLoading, setProducts, setProductsPagination } from "./productsSlice";

const productsBaseUrl = "http://localhost:5000/";

//GET ALL PRODUCTS
export const getProducts = (filters, page) => async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
        const { data } = await axios.get(productsBaseUrl + "products", {
            params: {
                page: page || 1,
                limit: filters?.itemsPerPage || 8,
                category: filters?.category || "",
                sortBy: filters?.sortBy || "",
                search: filters?.search || "",
            },
        });

        dispatch(setProducts(data.products));
        dispatch(setProductsPagination({ ...data.pagination }));
        // dispatch(
        //     setProductsPagination({ totalPages: data.totalPages, currentPage: data.currentPage })
        // );
    } catch (error) {
        console.log(error);
        dispatch(
            setError(
                error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message
                    ? error.message
                    : "An unexpected error ..."
            )
        );
    }
};

//GET SINGLE PRODUCT
export const getSingleProduct = async (productId) => {
    try {
        const response = await axios.get(`${productsBaseUrl}products/${productId}`);
        return response.data.product;
    } catch (error) {
        throw new Error(error.response?.data?.error || "An unexpected error ...");
    }
};
