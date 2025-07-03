import React from 'react';

const BookingItem = ({ booking, formatDate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <div className="font-medium text-lg md:w-1/4">{booking.from} to {booking.to}</div>
        <div className="text-gray-600 md:w-2/4">
          {formatDate(booking.departDate)} - {formatDate(booking.returnDate)}
        </div>
        <div className="md:w-1/4 text-right">
          <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}>
            {booking.status}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row text-sm text-gray-600">
        <div className="md:w-1/3">
          <span className="font-medium">Booking ID:</span> {booking.id}
        </div>
        <div className="md:w-1/3">
          <span className="font-medium">Airline:</span> {booking.airline}
        </div>
        <div className="md:w-1/3 text-right">
          <span className="font-medium">Passengers:</span> {booking.passengers}
        </div>
      </div>
      
      <div className="mt-4 flex justify-end space-x-3">
        <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 text-sm">
          View Details
        </button>
        {booking.status !== 'Completed' && (
          <button className="px-3 py-1 border border-indigo-500 text-indigo-500 rounded hover:bg-indigo-50 text-sm">
            Manage Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingItem;
