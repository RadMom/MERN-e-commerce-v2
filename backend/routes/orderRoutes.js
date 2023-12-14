// const express = require("express");
// const orderRoutes = express.Router();

// //controllers
// const {
//     getUserOrders,
//     getOrderById,
//     createOrder,
//     getAllOrders,
//     editOrder,
//     deleteOrder,
// } = require("../controllers/orderControllers");

// //authMiddleware
// const { protectRoute, admin } = require("../middleware/authMiddleware");

// //protected routes
// orderRoutes.get("/", protectRoute, getUserOrders);
// orderRoutes.get("/:orderId", protectRoute, getOrderById);
// orderRoutes.post("/", protectRoute, createOrder);

// //admin only routes!
// orderRoutes.get("/admin", protectRoute, admin, getAllOrders);
// orderRoutes.get("/admin/:orderId", protectRoute, admin, getOrderById);
// orderRoutes.put("/admin/:orderId", protectRoute, admin, editOrder);
// orderRoutes.delete("/admin/:orderId", protectRoute, admin, deleteOrder);

// module.exports = orderRoutes;
