import axios from "axios";
import { setError, setIsLoading, setProducts, setProductsPagination } from "./productsSlice";

const productsBaseUrl = "http://localhost:5000/";

//GET ALL PRODUCTS
export const getProducts = (filters, page) => async (dispatch) => {
    dispatch(setIsLoading(true));
    console.log(filters);
    try {
        const { data } = await axios.get(productsBaseUrl + "products", {
            params: {
                page: page || 1,
                limit: filters?.itemsPerPage || 10,
                category: filters?.category || "",
                sortBy: filters?.sortBy || "",
                search: filters?.search || "",
            },
        });
        console.log(data);
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
