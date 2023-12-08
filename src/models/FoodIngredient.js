const {DataTypes} = require("sequelize");
const sequelize = require("../db");
const Ingredient = require("./Ingredient");
const Food = require("./Food");

const FoodIngredient = sequelize.define("food_ingredient", {
        food_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Food,
                key: "id"
            }
        },
        ingredient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Ingredient,
                key: "id"
            }
        },
        value: {
            type: DataTypes.CHAR,
            allowNull: false
        },
    },
    {
        timestamps: false
    })

FoodIngredient.belongsTo(Food, {foreignKey: "food_id"});
FoodIngredient.belongsTo(Ingredient, {foreignKey: "ingredient_id"});

module.exports = FoodIngredient;