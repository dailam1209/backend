const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    des: {
        type: String,
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
    createdAt: {
		type: Date,
		default: Date.now
	}
});


module.exports = mongoose.model("Blog", BlogSchema);