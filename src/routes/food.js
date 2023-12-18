const express = require("express");
const router = express.Router();
const foodController = require("../controllers/FoodController");
const upload = require("../midleware/upload");
const authorization = require("../midleware/authorization");

router.get("/:id", foodController.getFoodById);
router.post("/create-food", authorization,upload.array("images"), foodController.createFood);

module.exports = router;