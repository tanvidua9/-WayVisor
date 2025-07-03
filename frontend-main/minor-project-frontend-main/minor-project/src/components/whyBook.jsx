import React from "react";
import { FaPlane, FaTag, FaExchangeAlt, FaHeadset, FaFire } from "react-icons/fa";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

function WhyBookWithUs() {
  const benefits = [
    {
      icon: <FaPlane className="text-blue-400 text-3xl" />,
      title: "Easy Booking",
      description: "We offer easy and convenient flight bookings with attractive offers."
    },
    {
      icon: <FaTag className="text-blue-400 text-3xl" />,
      title: "Lowest Price",
      description: "We ensure low rates on hotel reservation, holiday packages and on flight tickets."
    },
    {
      icon: <FaExchangeAlt className="text-blue-400 text-3xl" />,
      title: "Instant Refund",
      description: "Get instant refunds effortlessly on your travel bookings with us."
    },
    {
      icon: <FaHeadset className="text-blue-400 text-3xl" />,
      title: "24/7 Support",
      description: "Get assistance 24/7 on any kind of travel related query. We are happy to assist you."
    },
    {
      icon: <FaFire className="text-blue-400 text-3xl" />,
      title: "Exciting Deals",
      description: "Enjoy exciting deals on flights, hotels, buses, car rental and tour packages."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Why Book With Us?</h2>
        
        <div className="mt-4 md:mt-0 flex items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
          <span className="font-medium mr-2">Great</span>
          <div className="flex text-green-500 mr-2">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
          </div>
          <span className="text-sm text-gray-600">9,488 reviews on</span>
          <img 
            src="https://cdn.trustpilot.net/brand-assets/1.1.0/logo-black.svg" 
            alt="Trustpilot" 
            className="h-4 ml-2" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {benefits.map((benefit, index) => (
          <div 
            key={index}
            className="border-r last:border-r-0 border-gray-100 px-4 text-center flex flex-col items-center"
          >
            <div className="bg-blue-50 p-4 rounded-full mb-4">
              {benefit.icon}
            </div>
            <h3 className="font-bold text-xl mb-2">{benefit.title}</h3>
            <p className="text-gray-600 text-sm">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyBookWithUs;
