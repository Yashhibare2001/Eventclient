import React, { useEffect, useState } from 'react';
import './EventPages.css';

const EventPages = () => {
  const [events, setEvents] = useState([]);

  // Sample data (replace with API fetch later)
  useEffect(() => {
    setEvents([
      {
        id: 1,
        title: 'Tech Conference 2025',
        date: '2025-06-15',
        description: 'Join industry leaders discussing AI, Cloud, and Blockchain.',
        booked: false,
      },
      {
        id: 2,
        title: 'Startup Pitch Fest',
        date: '2025-07-03',
        description: 'Pitch your idea and win seed funding.',
        booked: true,
      },
    ]);
  }, []);

  const handleBooking = (id) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, booked: true } : event
    ));
  };

  return (
    <div className="events-page">
      <h2>Upcoming Events</h2>
      <div className="events-grid">
        {events.map(event => (
          <div className="event-card" key={event.id}>
            <h3>{event.title}</h3>
            <p className="date">📅 {event.date}</p>
            <p>{event.description}</p>
            {event.booked ? (
              <button className="booked" disabled>Booked</button>
            ) : (
              <button onClick={() => handleBooking(event.id)}>Book Now</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPages;
