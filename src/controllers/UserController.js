const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const login = async (req, res) => {
    try {
        const {user_name, password} = req.body;
        if (user_name && password) {
            const user = await User.scope("withPassword").findOne({
                where: {
                    user_name: user_name
                }
            });
            if (user) {
                if (password === user.password) {
                    const token = jwt.sign(
                        {
                            user_name: user.user_name,
                            id: user.id
                        },
                        process.env.SECRET_KEY
                    );
                    res
                        .status(200)
                        .json({
                            token,
                            user_name: user.user_name
                        });

                } else {
                    console.log(password, user.password);
                    res
                        .status(401)
                        .json({
                            message: "Wrong password"
                        });
                }
            } else {
                res.status(404).json({
                    message: "User not found"
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}


module.exports = {
    login
}