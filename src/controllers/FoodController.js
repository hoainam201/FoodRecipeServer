const Food = require("../models/Food");
const Image = require("../models/Image");
const Review = require("../models/Review")
const User = require("../models/User");

Review.belongsTo(User, {foreignKey: "user_id"});

const getFoodById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const food = await Food.findOne({
            where: {
                id
            }
        });
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
                attributes: ["user_name"]
            }],
            where: {
                food_id: food.id
            }
        });
        food.dataValues.reviews = reviews;
        const recommendedFoods = await Food.findAll({
            attributes: ["id", "name", "rating", "cooking_time"],
            where: {
                method: food.method
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
            food.dataValues.image = images[0].url;
        }
        food.dataValues.recommendedFoods = recommendedFoods
        res.send(food);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = {
    getFoodById
}