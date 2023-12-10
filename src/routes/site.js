const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController");

router.post('/search', siteController.search);
router.get('/get-ramdom-food', siteController.getRandomFoods);
router.post(['/', '/home'], siteController.home);

module.exports = router;