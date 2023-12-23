import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import classes from "./Signup.module.css";

import { signup } from "../../redux/auth/authApi";

const Signup = () => {
    console.log("Registration.jsx");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.auth.error);

    const [unexpectedError, setUnexpectedError] = useState(false);
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();

    const [enteredValues, setEnteredValues] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEnteredValues((prevValues) => ({
            ...enteredValues,
            [name]: value,
        }));
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        const username = enteredValues.username;
        const email = enteredValues.email;
        const password = enteredValues.password;
        dispatch(signup(username, email, password, navigate));
    };

    useEffect(() => {
        error === "Invalid password..."
            ? (setPasswordError(true), setEmailError(false), setUnexpectedError(false))
            : error === "Invalid email..."
            ? (setEmailError(true), setPasswordError(false), setUnexpectedError(false))
            : (setUnexpectedError(true), setEmailError(false), setPasswordError(false));
    }, [error]);

    return (
        <div className={classes.signup}>
            <h2>Welcome</h2>
            <div className={classes.error}>{unexpectedError && <p>{error}</p>}</div>
            <form onSubmit={formSubmitHandler} autoComplete="on" className={classes["signup-form"]}>
                <div className={classes["input-group"]}>
                    <label htmlFor="username">Enter username</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        onChange={handleInputChange}
                        required
                    />
                </div>
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
                <div
                    className={
                        passwordError
                            ? `${classes["input-group"]} ${classes.error}`
                            : classes["input-group"]
                    }
                >
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input
                        id="confirmPassword"
                        type="text"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        onChange={handleInputChange}
                        required
                    />
                    <span className={classes.msg}>Invalid password</span>
                </div>

                <button type="submit" className={classes["signup-button"]}>
                    Registration
                </button>
                <p>
                    <NavLink to="/login">Login</NavLink>
                </p>
            </form>
        </div>
    );
};

export default Signup;
