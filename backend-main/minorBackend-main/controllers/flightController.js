const flightService = require("../services/flightService");

exports.getFlights = async (req, res) => {
  try {
    console.log(`[INFO] Incoming request: ${req.originalUrl}`);

    const { origin, destination, departureDate } = req.body;

    if (!origin || !destination || !departureDate) {
      console.warn("[WARNING] Missing required parameters.");
      return res.status(400).json({
        error: "Missing required parameters: origin, destination, and departureDate"
      });
    }

    console.log(`[INFO] Fetching flights for ${origin} -> ${destination} on ${departureDate}`);
    const flights = await flightService.searchFlights(origin, destination, departureDate);

    res.status(200).json(flights);
  } catch (error) {
    console.error("[ERROR] Failed to fetch flights:", error.message);
    res.status(500).json({ error: "Failed to fetch flight data" });
  }
};
