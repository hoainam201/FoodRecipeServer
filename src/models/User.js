const {DataTypes} = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false,
        defaultScope: {
            attributes: {
                exclude: ["password"],
            }
        },
        scopes: {
            withPassword: {
                attributes: {
                    include: ["password"],
                }
            }
        }

    }
);

module.exports = User;