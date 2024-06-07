const mongoose = require('mongoose');


const ProductSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subcategory: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    salePercentage: {
        type: Number,
        required: false
    },
    des: {
        type: String,
        required: true
    },
    isBestSeller: {
        type: Boolean,
        default: false,
        required: false
    },
    star: {
        type: Number,
        require: true
    }, 
    color: {
        type: [String],
        required: true
    },
    sizes: {
        type: [String],
        required: true
    },
    manufatures: {
        type: String, 
        required: true,
    },
    instock: {
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
    listImg: {
        type: [{
            src: {
                type: String,
                required: true
            },
            alt: {
                type: String,
                required: true
            }
        }],
        required: false
    }
});

module.exports = mongoose.model("Product", ProductSchema);