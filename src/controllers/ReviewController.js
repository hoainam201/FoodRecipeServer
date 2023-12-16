const Review = require('../models/Review');
const Food = require('../models/Food');
const sequelize = require('../db');

const createReview = async (req, res) => {
    try {
        console.log(req.userData)
        const review = await Review.create(
            {
                user_id: req.userData.id,
                food_id: req.body.food_id,
                rating: req.body.rating,
                review: req.body.review
            }
        );
        const result = await Review.findOne({
            where: {
                food_id: req.body.food_id
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('rating')), 'rating'],
            ]
        })
        console.log(result);
        const avg = parseFloat(result.dataValues.rating);
        await Food.update(
            {
                rating: avg.toFixed(1)
            },
            {
                where: {
                    id: req.body.food_id
                }
            }
        )
        res.json(review);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = {
    createReview
}