import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AdminNav from "../components/admin/AdminNav";

const AdminLayout = () => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    return userInfo && userInfo.isAdmin ? (
        <>
            <AdminNav />
            <Outlet />
        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default AdminLayout;
