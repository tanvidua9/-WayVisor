const { getGeminiResponse } = require("./geminiService");

exports.getItinerary = async (location,preference) => {
  try {
    if (!location || typeof location !== "string") {
      throw new Error("Invalid request. 'location' must be a non-empty string.");
    }

    // Call Gemini API with a refined prompt
    const prompt = `I am a traveler who is ${preference}, List the top places to visit in ${location}. Only return top 10 place names, each on a new line, without any additional text(without even numbers).`;

    const geminiResponse = await getGeminiResponse(prompt);
    

    // Extract only the places from the response
    const responseText = geminiResponse?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const itineraryItems = responseText.split("\n").map((item) => item.trim()).filter(Boolean);

    return {
      location,
      itinerary: itineraryItems,
    };
  } catch (error) {
    console.error("Itinerary Service Error:", error.message);
    return { error: "Failed to fetch itinerary", details: error.message };
  }
};
