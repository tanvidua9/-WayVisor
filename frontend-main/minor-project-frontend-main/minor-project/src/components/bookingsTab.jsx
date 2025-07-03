import React from 'react';
import { Calendar } from 'lucide-react';
import BookingItem from './BookingItem';
import CalendarView from './CalendarView';

const BookingsTab = ({ bookings, showCalendarView, setShowCalendarView, formatDate }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Booking History</h2>
          <p className="text-gray-600 mt-1">View and manage your travel bookings</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowCalendarView(!showCalendarView)}
            className={`px-4 py-2 rounded-md flex items-center ${
              showCalendarView 
                ? 'bg-indigo-600 text-white' 
                : 'border border-gray-300 text-gray-700'
            }`}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Calendar View
          </button>
        </div>
      </div>
      
      {showCalendarView ? (
        <CalendarView bookings={bookings} />
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingItem 
              key={booking.id} 
              booking={booking} 
              formatDate={formatDate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsTab;