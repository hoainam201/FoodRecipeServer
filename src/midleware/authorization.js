const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(req.headers.authorization)
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({
            where: {
                id: decoded.id
            }
        })
        if(!user) {
            res.sendStatus(401);
        }
        req.userData = decoded;
        next();
    }
    catch(error) {
        console.log(error);
        res.sendStatus(401);
    }
}