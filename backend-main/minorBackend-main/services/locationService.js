const axios = require("axios");
const dotenv = require("dotenv");
const qs = require("qs");

dotenv.config();

const AMADEUS_AUTH_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";
const AMADEUS_LOCATIONS_URL = "https://test.api.amadeus.com/v1/reference-data/locations";

// Function to get Amadeus API access token
const getAccessToken = async () => {
  try {
    const response = await axios.post(
      AMADEUS_AUTH_URL,
      qs.stringify({
        grant_type: "client_credentials",
        client_id: process.env.AMADEUS_API_KEY,
        client_secret: process.env.AMADEUS_API_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("[ERROR] Failed to fetch access token:", error.response?.data || error.message);
    throw error;
  }
};

const getLocationNames = async (location, country) => {
  try {
    const accessToken = await getAccessToken();
    const params = {
      subType: "AIRPORT,CITY", // FIXED: Use a comma-separated string instead of an array
      keyword: location,
      view: "LIGHT",
    };
    if (country) params.countryCode = country;

    const response = await axios.get(AMADEUS_LOCATIONS_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params,
    });

    const locations = response.data.data.map((loc) => loc.name);
    return locations;
  } catch (error) {
    console.error("[ERROR] Failed to fetch location names:", error.response?.data || error.message);
    throw error;
  }
};


module.exports = { getLocationNames }