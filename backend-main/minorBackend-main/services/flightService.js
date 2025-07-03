const axios = require("axios");
const dotenv = require("dotenv");
const qs = require("qs");
const { getGeminiResponse } = require("./geminiService");

dotenv.config();

const AMADEUS_API_URL = "https://test.api.amadeus.com/v2/shopping/flight-offers";
const AMADEUS_AUTH_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";

exports.searchFlights = async (origin, destination, departureDate) => {
  try {
    console.log(`[INFO] Requesting flights: ${origin} -> ${destination} on ${departureDate}`);

    // Step 1: Get Amadeus API token
    const tokenResponse = await axios.post(
      AMADEUS_AUTH_URL,
      qs.stringify({
        grant_type: "client_credentials",
        client_id: process.env.AMADEUS_API_KEY,
        client_secret: process.env.AMADEUS_API_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    const accessToken = tokenResponse.data.access_token;

    // Step 2: Request flight offers
    const requestBody = {
      currencyCode: "INR",
      originDestinations: [
        {
          id: "1",
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDateTimeRange: { date: departureDate },
        },
      ],
      travelers: [{ id: "1", travelerType: "ADULT" }],
      sources: ["GDS"],
      searchCriteria: { maxFlightOffers: 5 },
    };

    const flightResponse = await axios.post(AMADEUS_API_URL, requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/vnd.amadeus+json",
        Accept: "application/vnd.amadeus+json",
      },
    });

    const flightData = flightResponse.data;

    // Step 3: Ask Gemini to format it nicely
    const geminiPrompt = `
You are a travel assistant. The following JSON contains flight offers.

Please extract and return an array of objects with the following structure:
- airlineName
- departureTime
- arrivalTime
- totalPrice
- planeType

Use simple keys and values. Here is the flight JSON:
${JSON.stringify(flightData)}
    `;

    const geminiResponse = await getGeminiResponse(geminiPrompt);
    const geminiText = geminiResponse?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Step 4: Extract and parse the JSON string
    const cleaned = geminiText.replace(/```json|```/g, "").trim();
    const structured = JSON.parse(cleaned);

    return { flights: structured };

  } catch (error) {
    console.error("[ERROR] Flight search failed:", error.response?.data || error.message);
    return {
      error: "Failed to fetch or parse flight data",
      details: error.response?.data || error.message,
    };
  }
};
