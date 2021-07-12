const UserServices = require("../Services/user.services");

exports.createUser = async (req, res, next) => {
    try {
        const response = await UserServices.createUser(req.body);
        return res.status(200).json(response);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ status: false, message: err.message });
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const response = await UserServices.getUser(req.user, req.params.id);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ status: false, message: err.message });
    }
};

exports.getUserForPost = async (req, res, next) => {
    try {
        const response = await UserServices.getUserForPost(req.user, req.params.id);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ status: false, message: err.message });
    }
};

exports.login = async (req, res, next) => {
    try {
        const response = await UserServices.login(req.body);
        return res.status(200).json(response);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ status: false, message: err.message });
    }
};
