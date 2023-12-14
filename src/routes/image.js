const imageController = require("../controllers/ImageController");
const express = require("express");
const router = express.Router();

router.get("/:filename", imageController.getImage);

module.exports = router;