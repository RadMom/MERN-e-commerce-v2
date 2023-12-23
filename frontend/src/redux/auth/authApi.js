import axios from "axios";
import { setError, setUserInfo } from "./authSlice";

const baseAuthUrl = "http://localhost:5000/user/";

export const login = (email, password, navigate) => async (dispatch) => {
    try {
        const response = await axios.post(baseAuthUrl + "login", { email, password });
        console.log(response);

        if (response.statusText === "OK") {
            dispatch(setUserInfo(response.data));
            navigate("/");
        }
    } catch (error) {
        console.error(error.response.data);
        dispatch(
            setError(
                error.response && error.response.data.error
                    ? error.response.data.error.message
                    : error.message
                    ? error.message
                    : "An unexpected error ..."
            )
        );
    }
};

export const signup = (username, email, password, navigate) => async (dispatch) => {
    try {
        const response = await axios.post(baseAuthUrl + "signup", {
            username,
            email,
            password,
        });
        if (response.statusText === "OK") {
            dispatch(setUserInfo(response.data));
            navigate("/products");
        }
    } catch (error) {
        console.error(error.response.data);
        dispatch(
            setError(
                error.response && error.response.data.error
                    ? error.response.data.error.message
                    : error.message
                    ? error.message
                    : "An unexpected error ..."
            )
        );
    }
};
