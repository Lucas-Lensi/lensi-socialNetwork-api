const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    profilePicture: {
        type: String,
        default: null
    },
    hash_password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", UserSchema);
