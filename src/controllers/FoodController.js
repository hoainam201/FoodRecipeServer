const Food = require("../models/Food");
const Image = require("../models/Image");
const Review = require("../models/Review")
const User = require("../models/User")
const Ingredient = require("../models/Ingredient");
const FoodIngredient = require("../models/FoodIngredient");
const {Op} = require("sequelize");

Review.belongsTo(User, {foreignKey: "user_id"});
FoodIngredient.belongsTo(Food, {foreignKey: "food_id"});

const getFoodById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const food = await Food.findOne({
            where: {
                id
            }
        })
        if (!food) {
            return res.status(404).json({
                message: "Không tìm thấy món ăn!!!"
            });
        }
        const ingredients = await FoodIngredient.findAll({
            attributes: ["value"],
            include: [{
                model: Ingredient,
                attributes: ["name"]
            }],
            where: {
                food_id: food.id
            }
        });
        food.dataValues.ingredients = ingredients;
        const images = await Image.findAll({
            attributes: ["id", "url"],
            where: {
                food_id: food.id
            }
        });
        food.dataValues.images = images;
        const reviews = await Review.findAll({
            attributes: ["id", "rating", "review", "created_at"],
            include: [{
                model: User,
                attributes: ["username"]
            }],
            where: {
                food_id: food.id
            }
        });
        food.dataValues.reviews = reviews;
        const recommendedFoods = await Food.findAll({
            attributes: ["id", "name", "rating", "cooking_time"],
            where: {
                id: {
                    [Op.ne]: food.id
                }
            },
            limit: 4
        })
        for (let i = 0; i < recommendedFoods.length; i++) {
            const food = recommendedFoods[i];
            const images = await Image.findAll({
                where: {
                    food_id: food.id
                },
                limit: 1
            });
            if (images.length > 0)
                food.dataValues.image = images[0].url;
        }
        food.dataValues.recommendedFoods = recommendedFoods
        res.send(food);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const createFood = async (req, res) => {
    try {
        // req.body.owner = 1;
        console.log(req.body);
        const food = await Food.create(
            {
                name: req.body.name,
                description: req.body.description,
                cooking_time: req.body.cooking_time,
                method: req.body.method,
                owner: req.userData.id,
                steps: req.body.steps,
                video: req.body.video
            }
        );
        const ingredients = req.body.ingredients;
        // console.log(ingredients);
        if (ingredients) {
            for (let i = 0; i < ingredients.length; i++) {
                const isHave = await Ingredient.findOne(
                    {
                        where: {
                            name: ingredients[i].name
                        }
                    }
                )
                console.log('isHave', isHave, ingredients[i].name);
                if (!isHave) {
                    const newIngredient = await Ingredient.create({
                        name: ingredients[i].name
                    });
                    await FoodIngredient.create({
                        food_id: food.id,
                        ingredient_id: newIngredient.id,
                        value: ingredients[i].value
                    })
                } else {
                    const isHaveConstant = await FoodIngredient.findOne({
                        where: {
                            food_id: food.id,
                            ingredient_id: isHave.id
                        }
                    });
                    if (!isHaveConstant)
                        await FoodIngredient.create({
                            food_id: food.id,
                            ingredient_id: isHave.id,
                            value: ingredients[i].value
                        })
                }
            }
        }
        const url = []
        if (req.files) {
            const imageUrl = req.files.map(file => {
                file.filename;
                url.push("http://localhost:5000/image/" + file.filename)
            });
            if (url)
                for (let i = 0; i < url.length; i++) {
                    await Image.create({
                        food_id: food.id,
                        url: url[i]
                    })
                }
            ;
        }
        food.url = url;
        res.send(food);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = {
    getFoodById,
    createFood
}