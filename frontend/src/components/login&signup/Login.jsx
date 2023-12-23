import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import classes from "./Login.module.css";

import { login } from "../../redux/auth/authApi";
import { setError } from "../../redux/auth/authSlice";

const Login = ({ closeModal }) => {
    console.log("Login.jsx");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo, isLoading, error } = useSelector((state) => state.auth);

    const [unexpectedError, setUnexpectedError] = useState(false);
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [enteredValues, setEnteredValues] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEnteredValues((prevValues) => ({
            ...enteredValues,
            [name]: value,
        }));
        dispatch(setError(null));
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        const email = enteredValues.email;
        const password = enteredValues.password;
        dispatch(login(email, password, navigate));
    };

    useEffect(() => {
        dispatch(setError(null));
        if (closeModal && userInfo) {
            closeModal();
        }
    }, [userInfo]);

    useEffect(() => {
        error === "Invalid password..."
            ? (setPasswordError(true), setEmailError(false), setUnexpectedError(false))
            : error === "Invalid email..."
            ? (setEmailError(true), setPasswordError(false), setUnexpectedError(false))
            : (setUnexpectedError(true), setEmailError(false), setPasswordError(false));
    }, [error]);

    return (
        <div className={classes.login}>
            <h2>Welcome</h2>
            <div className={classes.error}>{unexpectedError && <p>{error}</p>}</div>
            <form onSubmit={formSubmitHandler} autoComplete="on" className={classes["login-form"]}>
                <div
                    className={
                        emailError
                            ? `${classes["input-group"]} ${classes.error}`
                            : classes["input-group"]
                    }
                >
                    <label htmlFor="email">Enter email</label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        placeholder="Enter email"
                        onChange={handleInputChange}
                        required
                    />
                    <span className={classes.msg}>Invalid email</span>
                </div>
                <div
                    className={
                        passwordError
                            ? `${classes["input-group"]} ${classes.error}`
                            : classes["input-group"]
                    }
                >
                    <label htmlFor="password">Enter password</label>
                    <input
                        id="password"
                        type="text"
                        name="password"
                        placeholder="Enter password"
                        onChange={handleInputChange}
                        required
                    />
                    <span className={classes.msg}>Invalid password</span>
                </div>

                <button type="submit" className={classes["login-button"]}>
                    Login
                </button>

                <p>
                    <NavLink to="/signup">Signup</NavLink>
                </p>
            </form>
        </div>
    );
};

export default Login;
