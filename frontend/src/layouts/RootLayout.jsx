import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/navs&footer/MainNavigation";
import Footer from "../components/navs&footer/Footer";

function RootLayout() {
    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default RootLayout;
