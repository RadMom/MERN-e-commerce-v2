const express = require("express");
const userRoutes = express.Router();

//authMiddleware
const { protectRoute, admin } = require("../middleware/authMiddleware");

//user controllers
const {
    loginUser,
    signupUser,
    updateUserProfile,
    getAllUsers,
    deleteUser,
} = require("../controllers/userController");

//public routes
userRoutes.post("/login", loginUser);
userRoutes.post("/signup", signupUser);

//protectedRoutes
userRoutes.put("/profile/:userId", protectRoute, updateUserProfile);

//admin only routes
userRoutes.get("/", protectRoute, admin, getAllUsers);
userRoutes.delete("/:userId", protectRoute, admin, deleteUser);

module.exports = userRoutes;
