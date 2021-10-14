const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    // https://www.npmjs.com/package/emoji-mart-vue-fast
    content: {
        type: String,
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },
    sendAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model("Message", MessageSchema);
