const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderCreatorId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
    },
    username: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
    },
    userEmail: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
    },
    orderItems: [
        {
            title: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
        },
    ],
    totalPrice: {
        type: Number,
        default: 0.0,
    },
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
});
