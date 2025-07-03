import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarView = ({ bookings }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Get month name and year
  const monthYearString = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  // Get days in month
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  
  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  // Create array of days in month
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Add empty days for start of month
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => null);
  
  // Get bookings for current month
  const monthBookings = bookings.filter(booking => {
    const departDate = new Date(booking.departDate);
    return departDate.getMonth() === currentMonth.getMonth() && 
           departDate.getFullYear() === currentMonth.getFullYear();
  });
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <button className="p-1 rounded-full hover:bg-gray-100" onClick={prevMonth}>
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-medium">{monthYearString}</h2>
        <button className="p-1 rounded-full hover:bg-gray-100" onClick={nextMonth}>
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="bg-gray-100 text-center py-2 text-sm font-medium text-gray-700">
            {day}
          </div>
        ))}
        
        {/* Empty cells for start of month */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="bg-white min-h-20 p-1 text-gray-300"></div>
        ))}
        
        {/* Calendar days */}
        {days.map((day) => {
          const dateString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayBookings = monthBookings.filter(booking => booking.departDate === dateString);
          
          return (
            <div key={`day-${day}`} className="bg-white min-h-20 p-1 text-gray-700">
              <div className="font-medium text-sm p-1">{day}</div>
              {dayBookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="mt-1 p-1 text-xs bg-indigo-100 text-indigo-800 rounded truncate"
                  title={`${booking.from} to ${booking.to}`}
                >
                  Flight to {booking.to.split(' ')[0]}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;