import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo(state, action) {
            console.log(action.payload);
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        logout(state, action) {
            localStorage.clear();
        },
    },
});

export const { setUserInfo, logout } = authSlice.actions;

export default authSlice.reducer;
