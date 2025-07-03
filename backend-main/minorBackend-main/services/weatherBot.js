const { getWeather } = require("./weatherService");
const { getGeminiResponse } = require("./geminiService");

exports.getWeatherForecast = async (location) => {
  try {
    if (!location || typeof location !== "string") {
      throw new Error("Invalid request. 'location' must be a non-empty string.");
    }

    // Fetch weather data for the next 10 days
    const weatherData = await getWeather(location, 10);

    if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) {
      throw new Error("Invalid weather data received");
    }

    // Format the forecast data
    const forecast = weatherData.forecast.forecastday.map((day) => ({
      date: day.date,
      dayOfWeek: new Date(day.date).toLocaleDateString("en-US", { weekday: "short" }),
      maxTemp: day.day.maxtemp_c,
      minTemp: day.day.mintemp_c,
      weatherType: day.day.condition.text.toLowerCase(),
      precipitation: day.day.daily_chance_of_rain, // % chance of rain
      humidity: day.day.avghumidity, // Average humidity
      windSpeed: day.day.maxwind_kph, // Max wind speed
    }));

    // Generate Gemini response with summarized weather insights
    const geminiPrompt = `Summarize the 10-day weather forecast for ${location} based on the following data:\n\n` +
      forecast.map((f) => `${f.date} (${f.dayOfWeek}): ${f.weatherType}, Max ${f.maxTemp}°C, Min ${f.minTemp}°C, ${f.precipitation}% rain chance, Humidity ${f.humidity}%, Wind ${f.windSpeed} km/h`).join("\n") +
      `\n\nProvide a brief and easy-to-understand summary for travelers.`;

    const geminiResponse = await getGeminiResponse(geminiPrompt);
    const summary = geminiResponse?.candidates?.[0]?.content?.parts?.[0]?.text || "No AI insights available.";

    return {
      city: location,
      forecast,
      summary,
    };
  } catch (error) {
    console.error("WeatherBot Error:", error.message);
    return { error: "Failed to fetch weather forecast", details: error.message };
  }
};
