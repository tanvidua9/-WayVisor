const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flightController");

router.get("/", (req, res, next) => {
  console.log(`[INFO] API call received: ${req.originalUrl}`);
  next();
}, flightController.getFlights);

module.exports = router;
