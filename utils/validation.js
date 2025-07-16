const ExpressError = require("./ExpressError.js");

module.exports.validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, errMsg);
    }
    next();
};