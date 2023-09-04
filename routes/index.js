"use strict"

const express = require("express");
const weatherController = require("../controllers");
const router = express.Router();

router.get("/info", weatherController.getWeather);
router.post("/info", weatherController.postWeather);

module.exports = router;
