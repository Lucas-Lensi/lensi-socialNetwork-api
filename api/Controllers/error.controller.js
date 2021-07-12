const ErrorServices = require("../Services/error.services");

exports.createErrorLog = async (req, res, next) => {
    try {
        const response = await ErrorServices.createError(req.body);
        return res.status(200).json(response);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ status: false, message: err.message });
    }
};
