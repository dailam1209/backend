const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const validator = require("validator");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        // required: true,
        // unique: true,
        minlength: [0, "Please enter a username atleast 3 characters"],
        maxlength: [15, "Username can not big than 15 characters"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    passwordConf: {
        type: String,
        required: true
    },
    createdAt: {
		type: Date,
		default: Date.now
	}
});





UserSchema.methods.comparePassword =  function (password) {
    return  bcrypt.compare(password, this.passwordConf);
};

UserSchema.methods.generrateAuthToken = function () {
    const token = jwt.sign({ _id: this._is },  process.env.KEY_SECRET , { expiresIn: '1d'});
    return token
};

UserSchema.static.findByToken  = function (token) {
    try {
        const decode = jwt.verify(token, process.env.KEY_SECRET);
        return this.findOne({ _id: decode._id});
    } catch (error) {
        throw new Error(`Error verifying token: ${err.message}`);
    }
}

module.exports = mongoose.model("User", UserSchema);