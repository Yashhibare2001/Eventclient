import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [bookedIds, setBookedIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  const userName = localStorage.getItem("userName") || "guest";
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://eventserver-28rf.onrender.com/api/events")
      .then((res) => setEvents(res.data.events || res.data))
      .catch((err) => console.error("Error fetching events", err));

    axios.get(`https://eventserver-28rf.onrender.com/api/booked-events/${userName}`)
      .then(res => setBookedIds(res.data.bookedEventIds || []))
      .catch((err) => console.error("Error fetching booked IDs", err));
  }, [userName]);

  const handleBookNow = (event) => {
    axios.post("https://eventserver-28rf.onrender.com/api/bookings", {
      userName,
      eventId: event._id,
      quantity: 1
    })
    .then(() => {
      setBookedIds(prev => [...prev, event._id]);
      navigate("/EventBooked", {
        state: { bookedEvent: event }
      });
    })
    .catch(() => {
      // Even if already booked, navigate with the event details
      navigate("/EventBooked", {
        state: { bookedEvent: event }
      });
    });
  };

  const allCategories = ["All", ...new Set(events.map((e) => e.category))];

  const filteredEvents = events.filter((event) => {
    const matchCat = selectedCategory === "All" || event.category === selectedCategory;
    const matchSearch = event.title.toLowerCase().includes(searchText.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="home-container">
      {/* Filter Bar */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search events..."
          className="search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="category-bar">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
          <button onClick={() => navigate("/EventBooked")} className="show-booked-link">
            Show Booked Events
          </button>
        </div>
      </div>

      {/* Event Cards */}
      <div className="event-grid">
        {filteredEvents.map((event) => (
          <div className="event-card" key={event._id}>
            <img src={event.image} alt={event.title} />
            <h4>{event.title}</h4>
            <p>{event.category}</p>
            <p>₹{event.price} • {event.date}</p>
            <p>⭐ {event.rating}</p>
            {bookedIds.includes(event._id) ? (
              <button className="booked-btn" disabled>Booked</button>
            ) : (
              <button className="book-btn" onClick={() => handleBookNow(event)}>
                Book Now
              </button>
            )}
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} EventEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
