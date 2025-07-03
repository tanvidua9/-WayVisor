import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FlightSearchComponent = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [travelers, setTravelers] = useState(1);
  const navigate = useNavigate();

  const airportData = [
    { city: 'Delhi', airport_code: 'DEL' },
    { city: 'Mumbai', airport_code: 'BOM' },
    { city: 'Bengaluru', airport_code: 'BLR' },
    { city: 'Kolkata', airport_code: 'CCU' },
    { city: 'Chennai', airport_code: 'MAA' },
    { city: 'Hyderabad', airport_code: 'HYD' },
    { city: 'Ahmedabad', airport_code: 'AMD' },
    { city: 'Pune', airport_code: 'PNQ' },
    { city: 'Lucknow', airport_code: 'LKO' },
    { city: 'Bhubaneswar', airport_code: 'BBI' },
    { city: 'Chandigarh', airport_code: 'IXC' },
    { city: 'Jaipur', airport_code: 'JAI' },
    { city: 'Goa', airport_code: 'GOI' },
    { city: 'Patna', airport_code: 'PAT' },
    { city: 'Indore', airport_code: 'IDR' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    if (!origin || !destination || !checkInDate || !checkOutDate) {
      alert('Please fill in all the required fields');
      return;
    }

   
    const destinationCity = airportData.find(airport => airport.airport_code === destination)?.city || destination;
    localStorage.setItem("location", destinationCity);
    
    localStorage.setItem("flightSearchData", JSON.stringify({
      origin,
      destination,
      checkInDate,
      checkOutDate,
      travelers
    }));

    const token = localStorage.getItem("authToken");

    if (token) {
      navigate('/verifying');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-cover bg-center pt-20" style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="backdrop-blur-md rounded-xl shadow-xl p-6 w-full max-w-5xl bg-transparent flex justify-center items-center">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4 flex-wrap">
          <div className="relative flex-1">
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-black"
            >
              <option value="">From</option>
              {airportData.map((airport) => (
                <option key={airport.airport_code} value={airport.airport_code}>
                  {airport.city} ({airport.airport_code})
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex-1">
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-black"
            >
              <option value="">To</option>
              {airportData.map((airport) => (
                <option key={airport.airport_code} value={airport.airport_code}>
                  {airport.city} ({airport.airport_code})
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-3 text-gray-400" />
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              placeholderText="Check-in Date"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
          </div>

          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-3 text-gray-400" />
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              placeholderText="Check-out Date"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
          </div>

          <div className="relative flex-1">
            <Users className="absolute left-3 top-3 text-gray-400" />
            <input
              type="number"
              min="1"
              value={travelers}
              onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button type="submit" className="px-6 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-800">
            TAKE ME THERE
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlightSearchComponent;
