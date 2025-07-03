const geminiService = require("../services/geminiService");

exports.getGeminiResponse = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid request. 'message' must be a non-empty string." });
    }

    const response = await geminiService.getGeminiResponse(message);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
