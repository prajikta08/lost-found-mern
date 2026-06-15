const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const data = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = data;
        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        });

    }
};