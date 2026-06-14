const jwt = require("jsonwebtoken");//used to create, sign and verify JWTs

module.exports = function(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.redirect("/login");
    }
    try{
        const data = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user = data;
        next();
    }catch(err){
        res.redirect("/login");
    }
}