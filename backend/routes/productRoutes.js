const express = require("express");
const productRoutes = express.Router();

const {
    getProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");

//authMiddleware
const { protectRoute, admin } = require("../middlewares/authMiddleware");

//public routes
productRoutes.get("/", getProducts);
productRoutes.get("/:productId", getOneProduct);

//admin only routes
productRoutes.post("/", protectRoute, admin, createProduct);
productRoutes.put("/:productId", protectRoute, admin, updateProduct);
productRoutes.delete("/:productId", protectRoute, admin, deleteProduct);

module.exports = productRoutes;
