const ConversationServices = require("../Services/conversation.services");

exports.createConversation = async (req, res, next) => {
    try {
        const response = await ConversationServices.createConversation(req.user, req.body, res);
        return res.status(200).json(response);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ status: false, message: err.message });
    }
};

exports.getConversationsByUser = async (req, res, next) => {
    try {
        const response = await ConversationServices.getConversationsByUser(req.user, res);
        return res.status(200).json(response);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ status: false, message: err.message});
    }
};
