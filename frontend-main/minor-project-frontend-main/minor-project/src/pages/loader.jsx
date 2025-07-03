import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Loader = () => {
  const [loadingText, setLoadingText] = useState('');
  const [dots, setDots] = useState('');
  const [currentType, setCurrentType] = useState('general');
  const navigate = useNavigate();

  const messages = {
    flight: [
      "Searching for the perfect flights ✈️",
      "Scanning the skies for great deals 🛫",
      "Preparing your journey above the clouds ☁️",
      "Calculating the fastest routes 🗺️",
      "Checking available seats just for you 💺"
    ],
    hotel: [
      "Finding your perfect stay 🏨",
      "Searching for the coziest rooms 🛏️",
      "Checking availability at top-rated hotels 🌟",
      "Hunting for the best hotel deals 💰",
      "Exploring luxury accommodations 🏆"
    ],
    weather: [
      "Checking the skies for your forecast ☀️",
      "Predicting weather patterns 🌦️",
      "Analyzing temperature trends 🌡️",
      "Gathering precipitation data 🌧️",
      "Bringing you the latest weather updates 🌈"
    ],
    general: [
      "Preparing your travel experience 🧳",
      "Getting everything ready for you 🌍",
      "Making travel magic happen ✨",
      "Curating your perfect trip 🏝️"
    ]
  };

  // Rotate through different types
  useEffect(() => {
    const types = ['general', 'flight', 'hotel', 'weather'];
    let typeIndex = 0;

    const typeInterval = setInterval(() => {
      typeIndex = (typeIndex + 1) % types.length;
      setCurrentType(types[typeIndex]);
    }, 6000);

    return () => clearInterval(typeInterval);
  }, []);

  // Cycle through messages for the current type
  useEffect(() => {
    const messageArray = messages[currentType];
    let messageIndex = 0;

    const messageInterval = setInterval(() => {
      setLoadingText(messageArray[messageIndex]);
      messageIndex = (messageIndex + 1) % messageArray.length;
    }, 3000);

    return () => clearInterval(messageInterval);
  }, [currentType]);

  // Animate dots
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + '.' : '');
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  // Auto navigation after delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/itinerary');
    }, 7000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  const themeConfig = {
    flight: {
      bgGradient: 'from-blue-50 to-blue-100',
      primary: 'bg-blue-500',
      textColor: 'text-blue-600',
      icon: '✈️',
    },
    hotel: {
      bgGradient: 'from-rose-50 to-rose-100',
      primary: 'bg-rose-500',
      textColor: 'text-rose-600',
      icon: '🏨',
    },
    weather: {
      bgGradient: 'from-amber-50 to-amber-100',
      primary: 'bg-amber-500',
      textColor: 'text-amber-600',
      icon: '☀️',
    },
    general: {
      bgGradient: 'from-emerald-50 to-emerald-100',
      primary: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      icon: '🌍',
    }
  };

  const theme = themeConfig[currentType];

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-gradient-to-br ${theme.bgGradient} z-50 transition-colors duration-1000`}>
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 flex flex-col items-center transform transition-all duration-500">
        {/* Animated icon */}
        <div className="relative mb-8">
          <div className={`w-32 h-32 rounded-full ${theme.primary} opacity-20 animate-spin`}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl animate-bounce">{theme.icon}</span>
          </div>
        </div>

        {/* Loading text */}
        <div className={`${theme.textColor} text-xl font-medium text-center mb-8 min-h-[2rem] transition-colors duration-500`}>
          {loadingText}<span className="inline-block w-8 text-left">{dots}</span>
        </div>

        {/* Bouncing dots */}
        <div className="flex justify-center space-x-3 mb-6">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className={`w-3 h-3 rounded-full ${theme.primary} transition-colors duration-500`}
              style={{ 
                animation: "bounce 1.5s ease infinite",
                animationDelay: `${i * 0.2}s`
              }}
            ></div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
          <div 
            className={`h-full ${theme.primary} transition-colors duration-500`}
            style={{
              animation: "progressWidth 2s ease-in-out infinite"
            }}
          ></div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        @keyframes progressWidth {
          0%, 100% { width: 10%; }
          50% { width: 90%; }
        }
      `}</style>
    </div>
  );
};

export default Loader;
