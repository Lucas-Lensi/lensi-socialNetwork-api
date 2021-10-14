const Conversation = require("../Models/Conversation");
const ApiService = require("./api.services");

exports.createConversation = async (user, data, res) => {
    try {
        if (!user) {
            return ApiService.exitRequest(res, 404, false, 'create conversation', 'User not allowed to use the API');
        }
        let newConversation = new Conversation(data);
        await newConversation.save();
        return {
            status: true,
            data: newConversation
        }
    } catch (err) {
        console.log(err);
        return ApiService.exitRequest(res, 404, false, 'create conversation', err.message);
    }
}

exports.getConversationsByUser = async (user, res) => {
    try {
        if (!user) {
            return ApiService.exitRequest(res, 404, false, 'get conversation', 'User not allowed to use the API');
        }
        const conversations = await Conversation.find({users: '6087fde6ee4ee62ea8f9a021'});
        return {
            status: true,
            data: conversations
        }
    } catch (err) {
        console.log(err);
        return ApiService.exitRequest(res, 404, false, 'get conversation', err.message);
    }
}

exports.getConversationById = async (user, id) => {}
