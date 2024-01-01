import React, { useState } from "react";
import { NavLink, useNavigation } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/auth/authSlice";

//icons
import { FaBars } from "react-icons/fa6";
import { FaAlignLeft, FaCartShopping } from "react-icons/fa6";

const MainNavigation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigation();

    const userInfo = useSelector((state) => state.auth.userInfo);
    const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);

    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileMenu = () => {
        setShowMobileMenu((oldState) => !showMobileMenu);
    };

    const logoutHandler = () => {
        dispatch(setLogout());
    };

    return (
        <header className={classes["main-header"]}>
            <h1 className={classes.title}>E-commerce v2</h1>
            <nav className={classes["main-nav"]}>
                <div className={classes.mobile}>
                    {showMobileMenu ? (
                        <FaAlignLeft
                            className={classes["nav-menu-icon"]}
                            onClick={toggleMobileMenu}
                        />
                    ) : (
                        <FaBars className={classes["nav-menu-icon"]} onClick={toggleMobileMenu} />
                    )}
                </div>

                <div
                    className={`${classes["main-links-container"]} ${
                        showMobileMenu && classes["show-mobile-main-menu"]
                    }`}
                >
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

                    <div className={classes["user-info"]}>
                        {userInfo ? (
                            <>
                                <p>{userInfo.email}</p>
                                <button onClick={logoutHandler}>Logout</button>
                            </>
                        ) : (
                            <NavLink to="/login">Login</NavLink>
                        )}
                    </div>
                </div>
                <div className={classes.cart}>
                    <NavLink to="/cart">
                        <FaCartShopping className={classes.icon} />
                        <span className={classes.badges}>{cartTotalQuantity}</span>
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default MainNavigation;
