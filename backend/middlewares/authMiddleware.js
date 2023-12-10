const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protectRoute = async (req, res, next) => {
    let token;

    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({ message: "Not authorized !!!" });
    }

    token = authorization.split(" ")[1];
    console.log(token);
    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById({ _id });
        console.log(`ProtectRoute -USER : ${req.user}`);
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Not authorized, token failed !!!" });
    }
};

const admin = async (req, res, next) => {
    if (req.user && req.user.isAdmin === true) {
        console.log(`ProtectRoute - ADMIN: ${req.user}`);
        next();
    } else {
        return res.status(401).json({ message: "Not authorized as ADMIN !!!" });
    }
};

module.exports = { protectRoute, admin };
