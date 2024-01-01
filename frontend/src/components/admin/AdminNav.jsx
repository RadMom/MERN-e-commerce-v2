import React from "react";
import classes from "./AdminNav.module.css";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
    return (
        <nav className={classes["admin-nav"]}>
            <ul>
                <li>
                    <NavLink
                        to="admin/products"
                        className={({ isActive }) => (isActive ? classes.active : undefined)}
                        end
                    >
                        Products
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="admin/users"
                        className={({ isActive }) => (isActive ? classes.active : undefined)}
                    >
                        Users
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="admin/orders"
                        className={({ isActive }) => (isActive ? classes.active : undefined)}
                    >
                        Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="admin/create"
                        className={({ isActive }) => (isActive ? classes.active : undefined)}
                    >
                        Create Product
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default AdminNav;
