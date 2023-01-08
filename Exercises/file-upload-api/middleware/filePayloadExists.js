const filePayloadExists = (req, res, next) => {
    if(!req.files) return res.status(400).json({status: "error", message: "missing files"});
    next();
}

module.exports = filePayloadExists;