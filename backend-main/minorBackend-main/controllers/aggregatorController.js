const hotelService = require("../services/hotelService");
const weatherService = require("../services/weatherService");
const trafficService = require("../services/trafficService");
const chatbotService = require("../services/chatbotService");

exports.getAggregatedResponse = async (req, res) => {
  try {
    const hotelData = await hotelService.getHotels();
    const weatherData = await weatherService.getWeather();
    const trafficData = await trafficService.getTraffic();

    const finalResponse = await chatbotService.getChatbotResponse({
      hotelData,
      weatherData,
      trafficData
    });

    res.json(finalResponse);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
};

