const hotelService = require("../services/hotelService");

exports.getHotels = async (req, res) => {
  try {
    const { location } = req.body;

    if (!location) {
      return res.status(400).json({ error: "Missing 'location' in request body" });
    }

    const result = await hotelService.getHotels(location);

    if (result.error) {
      return res.status(500).json(result);
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("[HOTEL CONTROLLER ERROR]:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
