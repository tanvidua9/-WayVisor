const axios = require("axios");

exports.getGeminiResponse = async (message) => {
  try {
    if (!message || typeof message !== "string") {
      throw new Error("Invalid request. 'message' must be a non-empty string.");
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: message }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);

    return {
      error: "Failed to fetch chatbot response",
      details: error.response?.data || error.message
    };
  }
};
