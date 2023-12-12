const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes requiring authentication
const protectRoute = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        // Check if authorization header exists and has the correct format
        if (!authorization || !authorization.startsWith("Bearer")) {
            return res.status(401).json({ message: "No authorization token found!" });
        }

        const token = authorization.split(" ")[1];

        // Verify and decode the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user based on decoded token's ID
        const user = await User.findById(decoded._id).select("-password");

        // If user not found, return authentication failure
        if (!user) {
            return res.status(401).json({ error: { message: "User not found!" } });
        }

        // Set user in request object for further middleware/routes to use
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        // Handle different JWT-related errors
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: { message: "Invalid token!" } });
        } else if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: { message: "Token expired!" } });
        } else {
            return res.status(401).json({ error: { message: "Authentication failed!" } });
        }
    }
};

// Middleware to check if the user is an admin
const admin = async (req, res, next) => {
    try {
        // Check if the user exists in request object and is an admin
        if (req.user && req.user.isAdmin === true) {
            next(); // Proceed to the next middleware/route
        } else {
            return res.status(401).json({ message: "Not authorized as ADMIN!!!" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error!" });
    }
};

module.exports = { protectRoute, admin };
