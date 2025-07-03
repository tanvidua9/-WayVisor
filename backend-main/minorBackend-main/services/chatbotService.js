const axios = require("axios");

exports.getChatbotResponse = async (message) => {
  try {
    if (!message || typeof message !== "string") {
      throw new Error("Invalid request. 'message' must be a non-empty string.");
    }

    const response = await axios.post(
      process.env.DEEPSEEK_API,
      {
        model: "deepseek/deepseek-r1-distill-llama-8b",
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Chatbot API Error:", error.response?.data || error.message);

    return {
      error: "Failed to fetch chatbot response",
      details: error.response?.data || error.message
    };
  }
};
