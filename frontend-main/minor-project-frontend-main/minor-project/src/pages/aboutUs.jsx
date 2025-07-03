import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-indigo-50" style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      margin: 0,
      padding: 0,
      overflow: "auto"
    }}>
      {/* Header Banner */}
      <div className="bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold">About Us</h2>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-indigo-900 mb-6">Welcome to Wayvisor - Your Personal Travel Advisor</h2>
        
        <p className="text-lg text-gray-700 mb-8">
          At Wayvisor, we believe that every journey should be as unique as the traveler. Our mission is to revolutionize the way you plan and experience your trips with our cutting-edge AI-powered travel planner.
        </p>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Get Your Trip Advice</h3>
          <p className="text-gray-700">
            Our tagline "Your personal Trip Advisor" encapsulates the essence of what we offer - personalized, real-time travel guidance tailored just for you. We understand that no two travelers are alike, which is why we've developed a sophisticated platform that adapts to your individual preferences and needs.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h3 className="text-2xl font-semibold text-indigo-800 mb-4">How We Work</h3>
          <p className="text-gray-700 mb-4">
            Wayvisor harnesses the power of advanced AI to create customized itineraries that evolve in real-time. By analyzing your preferences, live traffic conditions, weather updates, we ensure that your travel plans are always optimized for the best possible experience.
          </p>
          <p className="text-gray-700">
            Our cloud-based platform seamlessly integrates various data streams to provide you with up-to-the-minute information, allowing you to make informed decisions for your journey. Whether you're looking for the perfect restaurant, seeking out hidden gems, or need to adjust your plans, Wayvisor has got you covered.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Why Choose Wayvisor?</h3>
          <ul className="space-y-3 text-gray-700 mb-6">
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span><strong className="text-indigo-800">Personalization:</strong> Our AI understands your unique travel style and preferences, crafting itineraries that resonate with your interests.</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span><strong className="text-indigo-800">Real-Time Updates:</strong> Stay ahead with live information on traffic, weather, and attractions.</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span><strong className="text-indigo-800">Flexibility:</strong> Easily modify your plans, with our platform adapting to your changes instantly.</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span><strong className="text-indigo-800">Comprehensive Planning:</strong> From flights and accommodations to activities and dining, we've got all aspects of your trip covered in one place.</span>
            </li>
          </ul>

          <p className="text-gray-700 italic border-l-4 border-indigo-500 pl-4 py-2">
            At Wayvisor, we're not just about planning trips; we're about crafting experiences. Let us be your guide to a world of seamless, personalized travel. Get your trip advice with Wayvisor and embark on journeys that are truly your own.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
