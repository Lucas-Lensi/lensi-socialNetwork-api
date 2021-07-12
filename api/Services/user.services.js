const User = require("../Models/User");
const ApiService = require("./api.services");
const TokenService = require("../Services/token.services");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (data) => {
    try {
        data.hash_password = bcrypt.hashSync(data.password, 10);
        let newUser = new User(data);
        await newUser.save();
        return {
            status: true,
            data: newUser,
        };
    } catch (err) {
        console.log(err);
        return ApiService.returnFormat(false, "create User", err.message);
    }
};

exports.getUser = async (userId) => {
    try {
        let user = await User.findById(userId);
        return {
            status: true,
            data: user,
        };
    } catch (err) {
        console.log(err);
        return ApiService.returnFormat(false, "get user by id", err.message);
    }
};

exports.getUserForPost = async (user, userId) => {
    try {
        if (user) {
            let user = await User.findById(userId, 'firstName lastName profilePicture');
            return {
                status: true,
                data: user,
            };
        } else {
            return ApiService.returnFormat(false, 'get User For Post', 'Not authorized')
        }
    } catch (err) {
        console.log(err);
        return ApiService.returnFormat(false, "get user by id", err.message);
    }
};

exports.login = async (userData) => {
    try {
        let user = await User.findOne({ email: userData.email });
        if (!user) {
            return ApiService.returnFormat(
                false,
                "login-wrong",
                "Email introuvable"
            );
        } else {
            if (!bcrypt.compareSync(userData.password, user.hash_password)) {
                return ApiService.returnFormat(
                    false,
                    "incorrect-pwd",
                    "Mot de passe incorrect"
                );
            } else {
                const token = await TokenService.generateToken(user._id);
                let response = {
                    token: token.data,
                };
                return {
                    status: true,
                    data: response,
                };
            }
        }
    } catch (err) {
        console.log(err);
        return ApiService.returnFormat(false, "Login user", err.message);
    }
};
