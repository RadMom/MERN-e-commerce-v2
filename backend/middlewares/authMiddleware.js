const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes requiring authentication
const protectRoute = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        // Check if authorization header exists and has the correct format
        if (!authorization || !authorization.startsWith("Bearer")) {
            // Create a new error for missing or incorrectly formatted token
            const error = new Error("No authorization token found!");
            error.status = 401; // Set the status code for unauthorized access
            throw error; // Throw the error to trigger the catch block
        }

        const token = authorization.split(" ")[1];

        // Verify and decode the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user based on decoded token's ID
        const user = await User.findById(decoded._id).select("-password");

        // If user not found, return authentication failure
        if (!user) {
            const error = new Error("User not found!");
            error.status = 401; // Set the status code for unauthorized access
            throw error; // Throw the error to trigger the catch block
        }

        // Set user in request object for further middleware/routes to use
        req.user = user;
        next(); // Move to the next middleware/route.
    } catch (error) {
        console.error(error);

        // Handle different JWT-related errors
        if (error.name === "JsonWebTokenError") {
            // Create a new error for an invalid authentication token
            const jwtError = new Error("Invalid authentication token!");
            jwtError.status = 401; // Set the status code for unauthorized access
            next(jwtError); // Pass the specific JWT error to the errorHandler middleware
        } else if (error.name === "TokenExpiredError") {
            // Create a new error for an expired token
            const tokenExpiredError = new Error("Token expired!");
            tokenExpiredError.status = 401; // Set the status code for unauthorized access
            next(tokenExpiredError); // Pass the token expiration error to the errorHandler middleware
        } else {
            next(error); // Pass any other errors to the errorHandler middleware
        }
    }
};

// Middleware to check if the user is an admin
const admin = async (req, res, next) => {
    try {
        // Check if the user exists in the request object and is an admin
        if (req.user && req.user.isAdmin === true) {
            next(); // Proceed to the next middleware/route if the user is an admin
        } else {
            // If the user is not an admin, create an error and throw it
            const error = new Error("Not authorized as ADMIN!!!");
            error.status = 401; // Set status code for unauthorized access
            throw error; // Throw the error to trigger the catch block
            // The following line won't execute due to 'throw', as it's after the throw statement!!!
            return res.status(401).json({ message: "Not authorized as ADMIN!!!" });
        }
    } catch (error) {
        next(error); // Pass any error to the error handling middleware
    }
};

module.exports = { protectRoute, admin };
