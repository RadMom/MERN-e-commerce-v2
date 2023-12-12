const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

//user Schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
    // Hash the password only if it's modified or is new
    if (this.isModified("password") || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
        } catch (error) {
            return next(error);
        }
    }
    next();
});

//static signup method. We use signup function in userControllers.
//It can be whatever we want- userSchema.statics.pepito but we must use the same name(pepito) in userController.js
userSchema.statics.signup = async function (username, email, password) {
    if (!username || !email || !password) {
        throw Error("Please provide username, email and password");
    }

    //Check if user already exists
    const userExist = await this.findOne({ email });
    if (userExist) {
        throw Error("Email already exists");
    }

    const user = await this.create({ username, email, password });

    return user;
};

//static login method. We use login function in userController.
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("Please provide email and password");
    }

    //Check if user exists
    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Invalid email...");
    }

    //Checking if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw Error("Invalid password...");
    }

    return user;
};

module.exports = mongoose.model("User", userSchema);
