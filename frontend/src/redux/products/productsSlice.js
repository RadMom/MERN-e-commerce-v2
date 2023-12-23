import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    error: null,
    isLoading: false,
    pagination: {
        totalPages: 1,
        currentPage: 1,
    },
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
        setProducts(state, action) {
            console.log(action.payload);
            state.error = null;
            state.products = action.payload;
            state.isLoading = false;
        },
        setError(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        setProductsPagination(state, action) {
            state.pagination = action.payload;
        },
    },
});

export const { setIsLoading, setProducts, setError, setProductsPagination } = productSlice.actions;
export default productSlice.reducer;
