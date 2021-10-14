const Message = require("../Models/Message");
const ApiService = require("./api.services");

exports.createMessage = async (user, data) => {
    try {
        if (!user) {
            return ApiService.exitRequest(res, 404, false, 'create message', 'User not allowed to use the API');
        }
        let newMessage = new Message(data);
        await newMessage.save();
    } catch (error) {
        console.log(err);
        return ApiService.exitRequest(res, 404, false, 'create message', 'User not allowed to use the API');
    }
}

exports.getMessages = async (user) => {
    try {
        if (!user) {
            return ApiService.exitRequest(res, 404, false, 'get messages', 'User not allowed to use the API');
        }
        const messages = await Message.find({});
        return {
            status: true,
            data: messages
        }
    } catch (err) {
        console.log(err);
        return ApiService.exitRequest(res, 404, false, 'get messages', 'User not allowed to use the API');
    }
}
