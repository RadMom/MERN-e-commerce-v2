import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//components
import RootLayout from "./layouts/RootLayout";
import Signup from "./components/login&signup/Signup";
import Login from "./components/login&signup/Login";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import UserProfilePage from "./pages/UserProfilePage";
import AdminPage from "./pages/admin/AdminPage";

function App() {
    const router = createBrowserRouter([
        {
            //public routes
            path: "/",
            element: <RootLayout />,
            errorElement: <ErrorPage />,
            children: [
                { index: true, element: <HomePage /> },
                { path: "signup", element: <Signup /> },
                { path: "login", element: <Login /> },
                { path: "about", element: <AboutPage /> },
                {
                    path: "products",
                    children: [
                        { index: true, element: <ProductsPage /> },
                        { path: ":productId", element: <ProductDetailsPage /> },
                    ],
                },
                { path: "cart", element: <CartPage /> },
                //private routes
                {
                    path: "profile",
                    element: <UserProfilePage />,
                },
                //admin routes
                { path: "admin", element: <AdminPage /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
