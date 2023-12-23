import React from "react";
import { NavLink, useNavigation } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/auth/authSlice";

const MainNavigation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigation();

    const userInfo = useSelector((state) => state.auth.userInfo);

    const logoutHandler = () => {
        dispatch(setLogout());
    };

    return (
        <header>
            <h1 className={classes.title}>E-commerce v2</h1>
            <nav className={classes["main-nav"]}>
                <div className={classes["main-links-container"]}>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? classes.active : undefined)}
                        end
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/products"
                        className={({ isActive }) => (isActive ? classes.active : undefined)}
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) => (isActive ? classes.active : undefined)}
                    >
                        About
                    </NavLink>
                </div>
                <div className={classes["user-info"]}>
                    {userInfo ? (
                        <div>
                            <p>{userInfo.email}</p>
                            <button onClick={logoutHandler}>Logout</button>
                        </div>
                    ) : (
                        <div>
                            <NavLink to="/login">Login</NavLink>
                        </div>
                    )}
                </div>

                <div className={classes.cart}>
                    <NavLink to="/cart" className={classes.cart}>
                        <span className={classes.icon}>icon</span>

                        <span className={classes.badges}>8</span>
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default MainNavigation;
