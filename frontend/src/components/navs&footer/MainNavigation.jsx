import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
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
                    <p>user@email.com</p>
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
