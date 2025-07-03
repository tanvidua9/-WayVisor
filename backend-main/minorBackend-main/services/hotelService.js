require("dotenv").config();
const axios = require("axios");
const { getGeminiResponse } = require("./geminiService");

exports.getHotels = async (location) => {
  try {
    if (!location || typeof location !== "string") {
      throw new Error("Invalid request. 'location' must be a non-empty string.");
    }

    const response = await axios.get(
      `${process.env.MAKCORPS_BASE_URL}?api_key=${process.env.MAKCORPS_API_KEY}&name=${location}`
    );

    const rawHotelList = response.data;

    const prompt = `
The following is a list of raw hotel search results for ${location}:\n\n${JSON.stringify(rawHotelList, null, 2)}\n\n
Please return a structured JSON array. Each object in the array should include:
- Hotel name
- Address (if available)
- City and Country
- Geo-coordinates (latitude and longitude)
- Place type (e.g., HOTEL)
Keep the format clean, readable, and make sure fields are human understandable.
`;

    const geminiResponse = await getGeminiResponse(prompt);

    const geminiText = geminiResponse?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Strip triple backticks and parse JSON
    const cleaned = geminiText.replace(/```json|```/g, "").trim();
    const hotels = JSON.parse(cleaned);

    return { hotels };
  } catch (error) {
    console.error("[HOTEL SERVICE ERROR]:", error.response?.data || error.message);
    return {
      error: "Failed to fetch and format hotel data",
      details: error.response?.data || error.message,
    };
  }
};

