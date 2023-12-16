const reviewController = require("../controllers/ReviewController");
const express = require("express");
const router = express.Router();
const authorization = require("../midleware/authorization");

router.post("/", authorization, reviewController.createReview);

module.exports = router;