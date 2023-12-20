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
                            message: "Sai mật khẩu!!!"
                        });
                }
            } else {
                res.status(404).json({
                    message: "Không tìm thấy tài khoản!!!"
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
                        message: "Tài khoản đã tồn tại!!!"
                    });
            } else {
                const newUser = await User.create({
                    username: username,
                    password: password
                });
                res
                    .status(200)
                    .json({
                        message: "Tạo tài khoản thành công!!!",
                    });
            }
        } else
            res.status(400).json({
                message: "Vui lòng điền đầy đủ!!!",
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