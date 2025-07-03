const axios = require("axios");


exports.getWeather = async (location, days) => {
  try {
    const response = await axios.get(process.env.WEATHER_API, {
      params: {
        key: process.env.WEATHER_API_KEY, 
        q: location, 
        days: days 
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    throw error;
  }
};
