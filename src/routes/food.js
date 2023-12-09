const express = require("express");
const router = express.Router();
const foodController = require("../controllers/FoodController");

router.get("/:id", foodController.getFoodById);

module.exports = router;