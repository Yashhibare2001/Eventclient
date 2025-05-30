import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BookingEvents.css";

const BookingEvents = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:5400/api/events/${id}`)
      .then((res) => setEvent(res.data.event))
      .catch((err) => console.error("Error fetching event:", err));
  }, [id]);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  const handleBooking = () => {
    alert(`🎟️ Booked ${count} ticket(s) for "${event.title}"`);
  };

  if (!event) return <p>Loading event...</p>;

  return (
    <div className="booking-page">
      <div className="booking-card">
        <img src={event.image} alt={event.title} />
        <h2>{event.title}</h2>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Price:</strong> ₹{event.price}</p>
        <p><strong>Rating:</strong> ⭐ {event.rating}</p>

        <div className="counter">
          <button onClick={decrement}>−</button>
          <span>{count}</span>
          <button onClick={increment}>+</button>
        </div>

        <p><strong>Total:</strong> ₹{event.price * count}</p>

        <button className="book-btn" onClick={handleBooking}>Book Now</button>
      </div>
    </div>
  );
};

export default BookingEvents;
