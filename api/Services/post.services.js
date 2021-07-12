const Post = require("../Models/Post");
const ApiService = require("./api.services");

exports.createPost = async (user, data) => {
    try {
        if (user) {
            let newPost = new Post(data);
            await newPost.save();
            return {
                status: true,
                data: newPost,
            };
        } else {
            return ApiService.returnFormat(
                false,
                'create Post',
                'User not allowed to use the api'
            )
        }
    } catch (err) {
        console.log(err);
        return ApiService.returnFormat(false, "create Post", err.message);
    }
};

exports.getPosts = async (user) => {
    try {
        if (user) {
            let allPosts = await Post.find({});
            return {
                status: true,
                data: allPosts
            }
        } else {
            return ApiService.returnFormat(false, 'get All Posts', 'Not authorized')
        }
    } catch (err) {
        console.log(err);
        return ApiService.returnFormat(false, "get All Posts", err.message);
    }
}
