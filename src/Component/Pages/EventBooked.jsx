import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import "./EventBooked.css";

const EventBooked = () => {
  const location = useLocation();
  const [bookedEvents, setBookedEvents] = useState([]);
  const [cancellingId, setCancellingId] = useState(null);
  const userName = localStorage.getItem("userName") || "guest";

  const fetchBookedEvents = useCallback(async () => {
    try {
      const bookingsRes = await axios.get(`https://eventserver-28rf.onrender.com/api/booked-events/${userName}`);
      const bookedEventIds = bookingsRes.data.bookedEventIds || [];

      const eventsRes = await axios.get("https://eventserver-28rf.onrender.com/api/events");
      const allEvents = eventsRes.data.events || eventsRes.data;

      const matchedEvents = allEvents.filter(event => bookedEventIds.includes(event._id));
      setBookedEvents(matchedEvents);
    } catch (error) {
      console.error("Error fetching booked events:", error);
    }
  }, [userName]);

  useEffect(() => {
    fetchBookedEvents();
  }, [fetchBookedEvents]);

  const newlyBookedEvent = location.state?.bookedEvent;

  const handleCancel = async (eventId) => {
    setCancellingId(eventId);

    // Optimistically remove the event from UI
    const remainingEvents = bookedEvents.filter(event => event._id !== eventId);
    setBookedEvents(remainingEvents);

    try {
      await axios.delete(`https://eventserver-28rf.onrender.com/api/bookings`, {
      data: { userName, eventId }
      });
      // Only remove the cancelled event from the UI
      setBookedEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
    } catch (error) {
      console.error("Cancel error:", error);
      alert("Failed to cancel booking.");
    } finally {
      setCancellingId(null);
    }
    };

  const allEventsToShow = newlyBookedEvent
    ? [newlyBookedEvent, ...bookedEvents.filter(e => e._id !== newlyBookedEvent._id)]
    : bookedEvents;

  return (
    <div className="booked-events-container">
      <h2>🎟️ Your Booked Events</h2>

      {allEventsToShow.length === 0 ? (
        <p>No events booked yet.</p>
      ) : (
        <div className="booked-events-grid">
          {allEventsToShow.map(event => (
            <div key={event._id} className="booked-event-card">
              <img src={event.image} alt={event.title} />
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Price:</strong> ₹{event.price}</p>

              <div className="qr-section">
                <p><strong>Booking QR:</strong></p>
                <QRCodeCanvas value={`Event:${event._id}|User:${userName}`} size={128} />
              </div>

              <button
                className="cancel-btn"
                onClick={() => handleCancel(event._id)}
                disabled={cancellingId === event._id}
              >
                {cancellingId === event._id ? "Cancelling..." : "Cancel Booking"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventBooked;
