const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        if (username && password) {
            const user = await User.scope("withPassword").findOne({
                where: {
                    username: username
                }
            });
            if (user) {
                if (password === user.password) {
                    const token = jwt.sign(
                        {
                            username: user.username,
                            id: user.id
                        },
                        process.env.SECRET_KEY
                    );
                    res
                        .status(200)
                        .json({
                            token,
                            // username: user.username
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

const register = async (req, res) => {
    try {
        const {username, password} = req.body;
        if (username && password) {
            const user = await User.findOne({
                where: {
                    username: username
                }
            });
            if (user) {
                res
                    .status(409)
                    .json({
                        message: "User already exists"
                    });
            }
            const newUser = await User.create({
                username: username,
                password: password
            });
            res
                .status(200)
                .json({
                    message: "User created",
                });
        } else
            res.status(400).json({
                message: "Bad request"
            })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}


module.exports = {
    login,
    register
}