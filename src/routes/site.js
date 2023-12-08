const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController");

router.post('/home', siteController.home);

module.exports = router;