const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    console.log(_id);
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = { createToken };
