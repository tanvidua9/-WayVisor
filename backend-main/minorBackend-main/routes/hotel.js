const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");

router.get("/", hotelController.getHotels);

module.exports = router;
