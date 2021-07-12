const PostServices = require("../Services/post.services");

exports.createPost = async (req, res, next) => {
    try {
        const response = await PostServices.createPost(req.user, req.body);
        return res.status(200).json(response);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ status: false, message: err.message });
    }
};

exports.getPosts = async (req, res, next) => {
    try {
        const response = await PostServices.getPosts(req.user);
        return res.status(200).json(response);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ status: false, message: err.message});
    }
};
