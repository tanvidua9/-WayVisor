const express = require("express");
const router = express.Router();
const { User } = require("../db/db");
const { getLocationNames } = require("../services/locationService");
const { getGeminiResponse } = require("../services/geminiService");
const { getCityId } = require("../services/hotelService");
const { getWeatherForecast } = require("../services/weatherBot");
const { getItinerary } = require("../services/itenaryService");
const {getFlights} = require("../controllers/flightController");
const {getHotels} = require("../controllers/hotelController");



router.get("/systemcheck", async (req, res) => {
   res.json({ status: "UP"});

});

router.get("/status", async (req, res) => {
  try {
    const user = await User.create({
      email: "rishiiiiiiiiiiiii@gmail.com",
      password: "abc",
      firstname: "Rishabh",
      lastname: "Kumar",
      phonenumber: 1234567890,
    });

    res.json({ status: "UP", user: user });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/check", async (req, res) => {
  try {
    const locations = await getLocationNames("BBI", "IN");
    console.log("Locations:", locations);
    res.json({ locations });
  } catch (error) {
    console.error("Error fetching locations:", error.message);
    res.status(500).json({ error: "Failed to fetch locations" });
  }
});

router.post("/flight", getFlights);


router.get("/gemini",async(req,res)=>{

  try{
    const response =await getGeminiResponse("I want to explore Bhubaneswar , i m in adventourous mood.. give me places to explore 10 places give me ");
    console.log(response);
    res.json({response});
  }
  catch(error){
    res.status(500).json({error:"working"});
  }
})



router.get("/cityid",async(req,res)=>{
  try{
    const response =await getCityId("Bhubaneswar");
   
    res.json({response:response});
  }
  catch(error){
    res.status(500).json({error:"working"});
  }
})


router.post("/itinerary-temp", async (req, res) => {
  try {
    const { location, mood } = req.body;

    if (!location || !mood) {
      return res.status(400).json({ error: "Location and preference are required." });
    }

    const itinerary = await getItinerary(location, mood);

    res.status(200).json({ itinerary });
  } catch (error) {
    console.error("Itinerary fetch error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


router.post("/hotels", getHotels);


router.post("/weather-bot", async (req, res) => {


  try {

    const { location } = req.body;

 
    const data = await getWeatherForecast(location);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }});

module.exports = router;
