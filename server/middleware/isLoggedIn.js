const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {

    console.log("Cookies:", req.cookies);

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
        console.log("JWT Error:", err);

        return res.status(401).json({
            message: "Invalid token"
        });
    }
};