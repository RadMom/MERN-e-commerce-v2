const { isValidObjectId } = require("mongoose");

const validateObjectId = (_id) => {
    if (!isValidObjectId(_id)) {
        throw new Error("Please provide valid ID!");
    }
    return true;
};

module.exports = { validateObjectId };
