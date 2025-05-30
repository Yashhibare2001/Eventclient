import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import "./HistoryPage.css";

const HistoryPage = () => {
  const [historyEvents, setHistoryEvents] = useState([]);
  const userName = localStorage.getItem("userName") || "guest";

  const fetchBookingHistory = useCallback(async () => {
    try {
      const bookingsRes = await axios.get(`https://eventserver-28rf.onrender.com/api/booked-events/${userName}`);
      const bookedEventIds = bookingsRes.data.bookedEventIds || [];

      const eventsRes = await axios.get("https://eventserver-28rf.onrender.com/api/events");
      const allEvents = eventsRes.data.events || eventsRes.data;

      const matched = allEvents.filter(event => bookedEventIds.includes(event._id));
      setHistoryEvents(matched);
    } catch (err) {
      console.error("Failed to load history", err);
    }
  }, [userName]);

  useEffect(() => {
    fetchBookingHistory();
  }, [fetchBookingHistory]);

  return (
    <div className="history-container">
      <h2>📜 My Booking History</h2>
      {historyEvents.length === 0 ? (
        <p>You haven’t booked any events yet.</p>
      ) : (
        <div className="history-grid">
          {historyEvents.map(event => (
            <div key={event._id} className="history-card">
              <img src={event.image} alt={event.title} />
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Price:</strong> ₹{event.price}</p>
              <div className="qr-section">
                <p><strong>Booking QR:</strong></p>
                <QRCodeCanvas value={`Event:${event._id}|User:${userName}`} size={128} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
