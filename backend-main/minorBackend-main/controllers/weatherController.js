const weatherService = require("../services/weatherService");

exports.getWeather = async (req, res) => {
  try {
    const { location, days } = req.query; 

   
    if (!location || !days) {
      return res.status(400).json({ error: "Missing required parameters: location and days" });
    }

    const weather = await weatherService.getWeather(location, days);
    res.json(weather);
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};
