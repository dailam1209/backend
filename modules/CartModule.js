const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user",
        required: true,
    },
    idProduct: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    sale: {
        type: Number,
        required: true
    },
    img: {
        type: {
            src: {
                type: String,
                required: true
            },
            alt: {
                type: String,
                required: true
            }
        },
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Cart", CartSchema);