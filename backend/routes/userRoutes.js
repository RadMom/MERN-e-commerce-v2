const express = require("express");
const userRoutes = express.Router();

//authMiddleware
const { protectRoute, admin } = require("../middlewares/authMiddleware");

//user controllers
const {
    loginUser,
    signupUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
} = require("../controllers/userController");

//public routes
userRoutes.post("/login", loginUser);
userRoutes.post("/signup", signupUser);

// protectedRoutes
userRoutes.get("/profile", protectRoute, getUserProfile);
userRoutes.put("/profile/:userId", protectRoute, updateUserProfile);

// //admin only routes
userRoutes.get("/", protectRoute, admin, getUsers);
userRoutes.delete("/:userId", protectRoute, admin, deleteUser);

module.exports = userRoutes;
