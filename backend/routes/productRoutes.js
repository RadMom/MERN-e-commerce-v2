// const express = require("express");
// const productRoutes = express.Router();

// const {
//     getAllProducts,
//     getOneProduct,
//     createProduct,
//     deleteProduct,
//     updateProduct,
// } = require("../controllers/productsController");

// //authMiddleware
// const { protectRoute, admin } = require("../middleware/authMiddleware");

// //public routes
// productRoutes.get("/", getAllProducts);
// productRoutes.get("/:productId", getOneProduct);

// //admin only routes
// productRoutes.post("/", protectRoute, admin, createProduct);
// productRoutes.put("/:productId", protectRoute, admin, updateProduct);
// productRoutes.delete("/:productId", protectRoute, admin, deleteProduct);

// module.exports = productRoutes;
