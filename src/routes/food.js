const express = require("express");
const router = express.Router();
const foodController = require("../controllers/FoodController");
const upload = require("../midleware/upload");

router.get("/:id", foodController.getFoodById);
router.post("/create-food", upload.array("images"), foodController.createFood);

module.exports = router;