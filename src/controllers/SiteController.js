const {Op, Sequelize} = require("sequelize");

const Food = require("../models/Food");
const Ingredient = require("../models/Ingredient");
const FoodIngredient = require("../models/FoodIngredient");
const Image = require("../models/Image")

async function getReqCookingTime(req) {
    const cooking_time = req.body.cooking_time || null;
    if (cooking_time) {
        switch (cooking_time) {
            case 1: {
                return {
                    [Op.between]: ["00:00:00", "00:20:00"]
                }
                break;
            }
            case 2: {
                return {
                    [Op.between]: ["00:20:00", "00:40:00"]
                }
                break;
            }
            case 3: {
                return {
                    [Op.between]: ["00:40:00", "01:00:00"]
                }
                break;
            }
            case 4: {
                return {
                    [Op.between]: ["01:00:00", "02:00:00"]
                }
                break;
            }
            case 5: {
                return {
                    [Op.gte]: "02:00:00"
                }
                break;
            }
        }
    }
    return null;
}

async function getReqMaxRating(req) {
    const max_rating = req.body.max_rating || null;
    if (max_rating) {
        return {
            [Op.between]: [max_rating - 1, max_rating]
        }
    }
    return null;
}

async function getFoodIdListReqByIngredients(req) {
    const ingredients = req.body.ingredients || null;
    if (ingredients && ingredients.length > 0) {
        const ing = {};
        ing.name = {
            [Op.or]: ingredients.map((ingredient) => ({
                [Op.like]: `%${ingredient}%`,
            })),
        }
        // console.log(ing.name);
        const foodIds = await FoodIngredient.findAll({
            include: {
                model: Ingredient,
                where: ing
            },
            attributes: ["food_id"]
        });
        const id = {
            [Op.in]: foodIds.map(foodId => foodId.food_id)
        }
        return id;
    }
    return null;
}

async function getFoodListByReq(req) {
    const page = parseInt((req.body.page)) || 1;
    const page_size = parseInt(req.body.page_size) || 8;
    const sort = req.body.sort || null;
    const by = req.body.by || null;

    const search = req.body.search || null;

    const query = {}
    if (req.body.cooking_time) {
        query.cooking_time = await getReqCookingTime(req)
    }
    if (req.body.max_rating) {
        query.rating = await getReqMaxRating(req)
    }
    if (req.body.ingredients && req.body.ingredients.length > 0) {
        query.id = await getFoodIdListReqByIngredients(req);
    }

    if (search) {
        query.name = {
            [Op.like]: `%${search.toLowerCase()}%`
        }
    }

    const foods = await Food.findAll({
        attributes: ["id", "name", "rating", "cooking_time"],
        where: query,
        // offset: (page - 1) * page_size,
        // limit: page_size,
        order: [[by || "updated_at", sort || "desc"]]
    })
    for (let i = 0; i < foods.length; i++) {
        const food = foods[i];
        const images = await Image.findAll({
            where: {
                food_id: food.id
            },
            limit: 1
        });
        if (images.length > 0)
            foods[i].dataValues.image = images[0].url;
    }
    return foods;
}

const home = async (req, res) => {
    try {
        const foods = await getFoodListByReq(req);
        res.json(foods);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const search = async (req, res) => {
    try {
        const foods = await getFoodListByReq(req);
        res.json(foods);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const getRandomFoods = async (req, res) => {
    try {
        const foods = await Food.findAll({
            attributes: ["id", "name", "rating", "cooking_time"],
            order: Sequelize.literal('random()'),
            limit: 8
        });
        for (let i = 0; i < foods.length; i++) {
            const food = foods[i];
            const images = await Image.findAll({
                where: {
                    food_id: food.id
                },
                limit: 1
            });
            if (images.length > 0)
                foods[i].dataValues.image = images[0].url;
        }
        res.json(foods);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = {
    home,
    search,
    getRandomFoods
}