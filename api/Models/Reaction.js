const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReactionSchema = new Schema({
    // https://www.npmjs.com/package/emoji-mart-vue-fast
    emoji: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
});

module.exports = mongoose.model("Reaction", ReactionSchema);
