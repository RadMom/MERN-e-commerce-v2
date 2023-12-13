const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { validateObjectId } = require("../middlewares/validateObjectId");
const { createToken } = require("../middlewares/createToken");

//login user
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            const error = new Error("Please provide both email and password.");
            error.status = 400; // Set a specific status code for this error
            throw error;
        }

        // Authenticate the user using the User model's login method
        const user = await User.login(email, password);

        if (!user) {
            const error = new Error("Authentication failed. Invalid credentials.");
            error.status = 401;
            throw error;
        }
        // Create a JWT token upon successful authentication
        const token = createToken(user._id);

        // Respond with user details and the generated token
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token,
        });
    } catch (err) {
        // Pass the caught error to the errorHandler middleware
        next(err);
    }
};

//signup controller
const signupUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.signup(username, email, password);
        const token = createToken(user._id);
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token,
        });
    } catch (err) {
        next(err);
    }
};

//getUserProfile controller
const getUserProfile = async (req, res, next) => {
    const _id = req.user._id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            const error = new Error("User not found!");
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            user: { _id: user._id, username: user.username, email: user.email },
        });
    } catch (err) {
        next(err);
    }
};
//updateUserProfile controller
const updateUserProfile = async (req, res, next) => {
    try {
        const _id = req.params.userId;

        validateObjectId(_id);
        const user = await User.findById(_id);

        if (user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = req.body.password;
            }
            await user.save();
            res.status(200).json({ message: "User profile updated successfully" });
        } else {
            const error = new Error("User not found !");
            error.status = 404;
            throw error;
        }
    } catch (err) {
        next(err);
    }
};

//ADMIN ONLY ROUTES

//deleteUser controller
const deleteUser = async (req, res, next) => {
    try {
        const _id = req.params.userId;

        validateObjectId(_id);
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            const error = new Error("User not found!");
            error.status = 404;
            throw error;
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        next(err);
    }
};

//getUsers controller
//getting all users || get user by ID or name
const getUsers = async (req, res, next) => {
    try {
        const { page, limit, searchBy, search } = req.query;

        // Parse numerical query parameters to integers to avoid headaches
        const pageInt = parseInt(page, 10) || 1; // Parse 'page' to integer, default to 1 if undefined or NaN
        const limitInt = parseInt(limit, 10) || 10; // Parse 'limit' to integer, default to 10 if undefined or NaN

        let query = {};

        // Handle different search criteria
        //Get user by ID
        if (searchBy === "id" && search.length > 0) {
            const _id = search;
            validateObjectId(_id);

            const user = await User.findById(_id);
            if (!user) {
                const error = new Error("User not found!");
                error.status = 404;
                throw error;
            }

            return res.status(200).json({ users: user });
            //Get user by NAME
        } else if (searchBy === "username" && search.length > 0) {
            query.username = { $regex: new RegExp(search, "i") };
        }

        console.log(query);
        const users = await User.find(query)
            .skip((pageInt - 1) * limitInt)
            .limit(limitInt);

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        const totalUsers = await User.countDocuments(query);

        return res.json({
            users,
            totalPages: Math.ceil(totalUsers / limitInt),
            currentPage: parseInt(pageInt),
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { loginUser, signupUser, getUserProfile, updateUserProfile, deleteUser, getUsers };
