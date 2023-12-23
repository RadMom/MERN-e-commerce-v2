import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
    error: null,
    isLoading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo(state, action) {
            console.log(action.payload);
            state.error = null;
            state.isLoading = true;
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));

            const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
            localStorage.setItem("expirationTime", expirationTime);

            state.isLoading = false;
        },
        setLogout(state, action) {
            state.userInfo = null;
            localStorage.clear();
        },
        setError(state, action) {
            state.isLoading = true;
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const { setUserInfo, setLogout, setError } = authSlice.actions;

export default authSlice.reducer;
