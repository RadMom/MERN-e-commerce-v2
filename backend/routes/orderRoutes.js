const express = require("express");
const orderRoutes = express.Router();

//controllers
const {
    createOrder,
    editOrder,
    deleteOrder,
    getUserOrders,
    getAllOrders,
    getOrderById,
} = require("../controllers/orderControllers");

//authMiddleware
const { protectRoute, admin } = require("../middleware/authMiddleware");

//user routes
orderRoutes.get("/", protectRoute, getUserOrders);
orderRoutes.get("/:orderId", protectRoute, getOrderById);
orderRoutes.post("/", protectRoute, createOrder);

//admin only routes!
orderRoutes.get("/admin/orders", protectRoute, admin, getAllOrders);
orderRoutes.put("/admin/:orderId", protectRoute, admin, editOrder);
orderRoutes.delete("/admin/:orderId", protectRoute, admin, deleteOrder);

module.exports = orderRoutes;
