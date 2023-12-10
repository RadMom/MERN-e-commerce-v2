const { isValidObjectId } = require("mongoose");

const validateObjectId = (id) => {
    return isValidObjectId(id);
};

module.exports = { validateObjectId };
