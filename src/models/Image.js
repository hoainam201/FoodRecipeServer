const {DataTypes} = require("sequelize");
const sequelize = require("../db");
const Food = require("./Food");

const Image = sequelize.define("images", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        food_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: "CASCADE",
            references: {
                model: Food,
                key: "id"
            }
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        timestamps: false
    });

Image.belongsTo(Food, {foreignKey: "food_id"});

module.exports = Image;