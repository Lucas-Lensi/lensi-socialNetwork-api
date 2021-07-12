exports.returnFormat = async (status, type, message) => {
    try {
        return {
            status: status,
            type: type,
            message: message
        }
    } catch (err) {
        console.log(err);
        throw Error('Error while returnFormat API SERVICE')
    }
}

exports.exitRequest = async (res, code, status, type, message) => {
    try {
        return res.status(code).send({
            status: status,
            type: type,
            message: message
        });
    } catch (err) {
        console.log(err);
        throw Error('Error while exitRequest API SERVICE')
    }
}