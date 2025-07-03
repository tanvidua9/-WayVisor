const express = require("express");
const router = express.Router();
const aggregatorController = require("../controllers/aggregatorController");

router.get("/", aggregatorController.getAggregatedResponse);

module.exports = router;
