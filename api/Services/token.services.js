const User = require("../Models/User");
const ApiService = require("./api.services");

const jwt = require("jsonwebtoken");

const VAR_ENV = require("../config.js");

exports.generateToken = async (userId) => {
    try {
        let user = await User.findById(userId);

        const token = jwt.sign(
            {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
            VAR_ENV.JWT_API_KEY,
            {
                expiresIn: "10h",
            }
        );
        return {
            status: true,
            data: token,
        };
    } catch (err) {
        console.log(err);
        return ApiService.returnFormat(false, "generateToken", err.message);
    }
};

exports.checkToken = async (token) => {
    try {
        try {
            const isValid = await jwt.verify(token, VAR_ENV.JWT_API_KEY);
            return {
                status: true,
                isValid: isValid,
            };
        } catch (err) {
            return ApiService.returnFormat(false, "checkToken", err.message);
        }
    } catch (err) {
        console.log(err);
        return ApiService.returnFormat(false, "checkToken", err.message);
    }
};
