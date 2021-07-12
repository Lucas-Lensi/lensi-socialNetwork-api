const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ErrorSchema = new Schema({
    statusCode: {
        type: Number,
        required: true,
    },
    navigator: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Error", ErrorSchema);
