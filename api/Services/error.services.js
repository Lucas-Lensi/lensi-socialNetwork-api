const Error = require("../Models/Error");
const ApiService = require("./api.services");

exports.createError = async (data) => {
    try {
        let newError = new Error(data);
        await newError.save();
        return {
            status: true,
            data: newError,
        };
    } catch (err) {
        console.log(err);
        return ApiService.returnFormat(false, "create Error", err.message);
    }
};
