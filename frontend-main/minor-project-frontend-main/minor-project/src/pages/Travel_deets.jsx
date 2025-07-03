import React, { useState, useEffect } from 'react';
import { Calendar, Cloud, CloudRain, CloudSnow, Sun, Thermometer, Umbrella, Wind, Plane, Clock, Building, Star, ExternalLink } from 'lucide-react';
import Header from '../components/header';

const TravelDetailsPage = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [weatherData, setWeatherData] = useState(null);
  const [flightData, setFlightData] = useState(null);
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState({
    weather: true,
    flights: true,
    hotels: true
  });
  
  // Helper function to convert ISO date string to YYYY-MM-DD format
  const formatDateToYYYYMMDD = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  };
  
  // Fetch data from the backend
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Get location and mood from localStorage
        const location = localStorage.getItem("location");
      //  const mood = localStorage.getItem("mood");
        
        const response = await fetch(`${url}/system/weather-bot`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ location })
        });
        
        const data = await response.json();
        setWeatherData(data);
        setLoading(prev => ({ ...prev, weather: false }));
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setLoading(prev => ({ ...prev, weather: false }));
      }
    };
    
    const fetchFlights = async () => {
      try {
        // Get flight search data from localStorage
        const flightSearchDataStr = localStorage.getItem("flightSearchData");
        const flightSearchData = flightSearchDataStr ? JSON.parse(flightSearchDataStr) : null;
        
        if (!flightSearchData) {
          throw new Error("Flight search data not found in localStorage");
        }
        
        const { origin, destination, checkInDate } = flightSearchData;
        
        // Format the date to YYYY-MM-DD
        const formattedDepartureDate = formatDateToYYYYMMDD(checkInDate);
        
        const response = await fetch(`${url}/system/flight`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            origin, 
            destination, 
            departureDate: formattedDepartureDate 
          })
        });
        
        const data = await response.json();
        // Updated to match the actual API response structure
        setFlightData(data.flights);
        setLoading(prev => ({ ...prev, flights: false }));
      } catch (err) {
        console.error('Error fetching flight data:', err);
        setLoading(prev => ({ ...prev, flights: false }));
      }
    };
    
    const fetchHotels = async () => {
      try {
        // Get location from localStorage
        const location = localStorage.getItem("location");
        
        if (!location) {
          throw new Error("Location not found in localStorage");
        }
        
        const response = await fetch(`${url}/system/hotels`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ location })
        });
        
        const data = await response.json();
        // Updated to match the actual API response structure
        setHotelData(data.hotels);
        setLoading(prev => ({ ...prev, hotels: false }));
      } catch (err) {
        console.error('Error fetching hotel data:', err);
        setLoading(prev => ({ ...prev, hotels: false }));
      }
    };
    
    fetchWeather();
    fetchFlights();
    fetchHotels();
  }, []);
  
  // Helper function to get weather icon
  const getWeatherIcon = (type) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('sunny')) {
      return <Sun className="h-8 w-8 text-yellow-500" />;
    } else if (lowerType.includes('cloudy') || lowerType.includes('partly cloudy')) {
      return <Cloud className="h-8 w-8 text-gray-400" />;
    } else if (lowerType.includes('rain')) {
      return <CloudRain className="h-8 w-8 text-blue-500" />;
    } else if (lowerType.includes('snow')) {
      return <CloudSnow className="h-8 w-8 text-blue-200" />;
    } else {
      return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };
  
  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Format time for display
  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  
  // Get destination and origin from localStorage
  const destination = localStorage.getItem("location") || "Unknown Destination";
  const flightSearchDataStr = localStorage.getItem("flightSearchData");
  const flightSearchData = flightSearchDataStr ? JSON.parse(flightSearchDataStr) : null;
  const origin = flightSearchData ? flightSearchData.origin : "Unknown Origin";
  const checkInDate = flightSearchData ? new Date(flightSearchData.checkInDate) : new Date();
  const checkOutDate = flightSearchData ? new Date(flightSearchData.checkOutDate) : new Date();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      {/* Header */}
      <div className="bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Trip to {weatherData ? weatherData.city : destination}</h1>
          <div className="flex flex-wrap items-center text-indigo-100">
            <div className="flex items-center mr-6 mb-2">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{formatDate(checkInDate)} - {formatDate(checkOutDate)}</span>
            </div>
            <div className="flex items-center mb-2">
              <Plane className="h-5 w-5 mr-2" />
              <span>From {origin}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
          {/* Weather Forecast */}
          <div className="col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Thermometer className="h-6 w-6 mr-2 text-indigo-600" />
                  Weather Forecast
                </h2>
                
                {loading.weather ? (
                  <div className="flex justify-center items-center h-48">
                    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : weatherData ? (
                  <div className="space-y-4">
                    {weatherData.forecast.map((day, index) => (
                      <div 
                        key={day.date} 
                        className={`flex items-center justify-between p-3 rounded-lg ${index === 0 ? 'bg-indigo-50 border border-indigo-100' : ''}`}
                      >
                        <div className="flex items-center">
                          <div className="flex flex-col items-center justify-center w-16">
                            {getWeatherIcon(day.weatherType)}
                            <span className="text-xs mt-1 font-medium text-gray-600">{day.dayOfWeek}</span>
                          </div>
                          <div className="ml-4">
                            <p className="font-medium">{formatDate(day.date)}</p>
                            <div className="flex text-sm text-gray-600 mt-1">
                              <span className="flex items-center mr-3">
                                <Umbrella className="h-3 w-3 mr-1" />
                                {day.precipitation}%
                              </span>
                              <span className="flex items-center">
                                <Wind className="h-3 w-3 mr-1" />
                                {day.windSpeed} km/h
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-xl">{day.maxTemp}°C</div>
                          <div className="text-gray-600 text-sm">{day.minTemp}°C</div>
                        </div>
                      </div>
                    ))}
                  
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Unable to load weather data
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Flight Prices */}
          <div className="col-span-1 lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Plane className="h-6 w-6 mr-2 text-indigo-600" />
                  Flight Options
                </h2>
                
                {loading.flights ? (
                  <div className="flex justify-center items-center h-48">
                    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : flightData ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Airline</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aircraft</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {flightData.map((flight, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                  {flight.airlineName.substring(0, 2)}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{flight.airlineName}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatTime(flight.departureTime)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatTime(flight.arrivalTime)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {flight.planeType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">₹{parseFloat(flight.totalPrice).toLocaleString()}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Unable to load flight data
                  </div>
                )}
              </div>
            </div>
            
            {/* Hotel Options */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Building className="h-6 w-6 mr-2 text-indigo-600" />
                  Hotel Options
                </h2>
                
                {loading.hotels ? (
                  <div className="flex justify-center items-center h-48">
                    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : hotelData ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {hotelData.map((hotel, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-1">{hotel.hotel_name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{hotel.address}</p>
                          <p className="text-gray-500 text-xs">{hotel.city_country}</p>
                          
                          
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Unable to load hotel data
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Final CTA */}
        <div className="mt-12 text-center">
          <button 
            
            onClick={() => window.location.href = '/'}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 text-lg"
          >
            Let's search for another destination
          </button>
          <p className="mt-4 text-gray-600">
            We'll help you book the best flights and hotels at the best prices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TravelDetailsPage;
