import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [], // Array to hold fetched products
    singleProduct: {},
    error: null, // To store error messages, if any
    isLoading: false, // Flag to manage loading state
    pagination: {
        totalPages: 1,
        currentPage: 1,
    }, // Pagination information
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setIsLoading(state, action) {
            state.isLoading = action.payload; // Update loading state based on the payload
        },
        setProducts(state, action) {
            console.log(action.payload); // Logging for debugging purposes
            state.error = null; // Resetting error state
            state.products = action.payload; // Update products with fetched data
            state.isLoading = false; // Set loading state to false after data retrieval
        },

        setError(state, action) {
            state.error = action.payload; // Set error message based on the payload
            state.isLoading = false; // Set loading state to false after error occurrence
        },
        setProductsPagination(state, action) {
            state.pagination = action.payload; // Update pagination data
        },
    },
});

export const { setIsLoading, setProducts, setError, setProductsPagination } = productSlice.actions;

export default productSlice.reducer;
