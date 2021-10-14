const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    // https://www.npmjs.com/package/emoji-mart-vue-fast
    title: {
        type: String,
        default: null
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
});

module.exports = mongoose.model("Conversation", ConversationSchema);
