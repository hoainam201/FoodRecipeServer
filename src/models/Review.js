const {DataTypes} = require("sequelize");
const sequelize = require("../db");
const User = require("./User");
const Food = require("./Food");

const Review = sequelize.define("reviews", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id"
            }
        },
        food_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Food,
                key: "id"
            },
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    },
    {
        timestamps: false
    }
);

module.exports = Review;