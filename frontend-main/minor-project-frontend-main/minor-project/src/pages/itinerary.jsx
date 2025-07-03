import React, { Suspense } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import Header from '../components/header';


// Create a resource that follows the Suspense contract
function createResource(promise) {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    (data) => {
      status = 'success';
      result = data;
    },
    (error) => {
      status = 'error';
      result = error;
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    }
  };
}

// Fetch function for itinerary data
const fetchItineraryData = (destination, mood) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  return fetch(`${url}/system/itinerary-temp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ location: destination, mood })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch itinerary data');
    }
    return response.json();
  })
  .then(data => {
    // Transform API response to the format needed by the component
    const attractions = data.itinerary.itinerary.map((name, index) => ({
      id: index + 1,
      name,
      description: `One of the most significant attractions in ${data.itinerary.location}. A must-visit for anyone exploring the city.`,
      rating: (4 + Math.random()).toFixed(1),
      visitDuration: Math.floor(Math.random() * 3) + 1, // 1-3 hours
      highlights: [
        'Popular attraction',
        'Cultural significance',
        'Scenic beauty'
      ]
    }));
    
    return {
      cityName: data.itinerary.location,
      attractions
    };
  });
};

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-50 flex justify-center items-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-xl text-gray-700">Creating your perfect itinerary...</p>
    </div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center" >
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <p className="text-red-500 text-xl mb-4">Failed to load itinerary. Please try again.</p>
            <button 
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Component that reads data from the resource
const ItineraryContent = ({ resource }) => {
  const itineraryData = resource.read();
  
  return (
    <div className="min-h-screen bg-gray-50" style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      margin: 0,
      padding: 0,
      overflow: "auto"
    }}>
      <Header/>
      
      <div className="relative bg-indigo-900 text-white">
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" >
            Discover {itineraryData.cityName}
          </h2>
          <p className="text-xl max-w-3xl mx-auto ">
            We've curated the perfect journey based on your preferences. Explore {itineraryData.cityName}. Go on Ahead!!!
          </p>
        </div>
      </div>
      
      {/* Itinerary Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
          <div className="p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Your {itineraryData.cityName} Journey</h2>
                <p className="text-gray-600 mt-2">Explore these carefully selected destinations for an amazing experience</p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                <MapPin className="w-4 h-4 mr-1" />
                {itineraryData.attractions.length} Destinations
              </div>
            </div>
            
            {/* Timeline of attractions */}
            <div className="space-y-12">
              {itineraryData.attractions.map((attraction, index) => (
                <div key={attraction.id} className="relative">
                  {/* Timeline connector */}
                  {index < itineraryData.attractions.length - 1 && (
                    <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-200"></div>
                  )}
                  
                  <div className="flex">
                    {/* Day indicator */}
                    <div className="flex-shrink-0 mr-6">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xl border-2 border-indigo-200">
                        Day {index + 1}
                      </div>
                    </div>
                    
                    {/* Attraction card */}
                    <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="md:flex">
                        <div className="p-6">
                          <div className="flex items-center">
                            <h3 className="text-xl font-bold text-gray-900">{attraction.name}</h3>
                          </div>
                          <p className="mt-3 text-gray-600">{attraction.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="text-center">
          <button 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 text-lg"
            onClick={() => window.location.href = '/travelDetails'}
          >
            Let's Explore
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <p className="mt-4 text-gray-600">
            Ready to see weather conditions, flight prices, and hotel options for your trip?
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Itinerary page component
const ItineraryPage = () => {
  // Get destination and mood from localStorage
  const destination = localStorage.getItem("location") || "Bhubaneswar";
  const mood = localStorage.getItem("mood") || "spiritual";
  
  // Create the data resource
  const itineraryResource = createResource(fetchItineraryData(destination, mood));
  
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <ItineraryContent resource={itineraryResource} />
      </Suspense>
    </ErrorBoundary>
  );
};


export default ItineraryPage;
