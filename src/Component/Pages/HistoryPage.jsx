import React, { useEffect, useState } from 'react';
import './HistoryPage.css';

const HistoryPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings([
      {
        id: 1,
        event: 'Tech Conference 2025',
        date: '2025-06-15',
        status: 'Booked',
      },
      {
        id: 2,
        event: 'Startup Pitch Fest',
        date: '2025-05-10',
        status: 'Completed',
      },
      {
        id: 3,
        event: 'Design Thinking Workshop',
        date: '2025-05-25',
        status: 'Canceled',
      },
    ]);
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Booked':
        return 'status-booked';
      case 'Completed':
        return 'status-completed';
      case 'Canceled':
        return 'status-canceled';
      default:
        return '';
    }
  };

  return (
    <div className="history-page">
      <h2>Your Booking History</h2>
      <div className="booking-list">
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((booking) => (
            <div className="booking-card" key={booking.id}>
              <h3>{booking.event}</h3>
              <p className="date">📅 {booking.date}</p>
              <span className={`status ${getStatusClass(booking.status)}`}>
                {booking.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
