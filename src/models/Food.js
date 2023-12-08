const {DataTypes} = require("sequelize");
const sequelize = require("../db");
const User = require("./User");

const method = ["Stir-fry", "Steam", "Boil", "Grill", "Fry", "Roast", "Braise", "Poach", "Stew", "Mix", "Pickle"];

const Food = sequelize.define("foods", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id"
            }
        },
        method: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: method[Math.floor(Math.random() * method.length)]
        },
        cooking_time: {
            type: DataTypes.TIME,
            allowNull: false
        }
        ,
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        steps: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        rating: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 5
        }
        },
        video: {
            type: DataTypes.TEXT,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        timestamps: false
    });

module.exports = Food;