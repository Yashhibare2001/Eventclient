// import React, { useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import "./Home.css";

// const allSections = {
//   Movies: [
//     { title: "IPL T20 2025", category: "Sports", image: "/assets/ipl.jpg" },
//     { title: "Housefull 5", category: "Comedy", image: "/assets/housefull5.jpg" },
//     { title: "Final Destination", category: "Horror", image: "/assets/finaldestination.jpg" },
//     { title: "Saunkan 2", category: "Romantic", image: "/assets/saunkan2.jpg" },
//     { title: "Hope on Stage", category: "Music", image: "/assets/jhope.jpg" },
//     { title: "IPL T20 2025", category: "Sports", image: "/assets/ipl.jpg" },
//     { title: "Housefull 5", category: "Comedy", image: "/assets/housefull5.jpg" },
//     { title: "Final Destination", category: "Horror", image: "/assets/finaldestination.jpg" },
//     { title: "Saunkan 2", category: "Romantic", image: "/assets/saunkan2.jpg" },
//     { title: "Hope on Stage", category: "Music", image: "/assets/jhope.jpg" },
//   ],
//   Activities: [
//     { title: "Yoga & Wellness", category: "Health", image: "/assets/yoga.jpg" },
//     { title: "Painting Workshop", category: "Art", image: "/assets/painting.jpg" },
//     { title: "Cooking Masterclass", category: "Food", image: "/assets/cooking.jpg" },
//   ],
//   Sports: [
//     { title: "Kabaddi League", category: "Sport", image: "/assets/kabaddi.jpg" },
//     { title: "Cricket Carnival", category: "Cricket", image: "/assets/cricket.jpg" },
//     { title: "Marathon 10K", category: "Fitness", image: "/assets/marathon.jpg" },
//   ],
// };

// const Home = () => {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchText, setSearchText] = useState("");

//   const sectionKeys = Object.keys(allSections);
//   const rowRefs = useRef(sectionKeys.map(() => React.createRef()));

//   const scrollLeft = (ref) => {
//     if (ref.current) ref.current.scrollLeft -= 300;
//   };

//   const scrollRight = (ref) => {
//     if (ref.current) ref.current.scrollLeft += 300;
//   };

//   const filterEvents = (events) => {
//     return events.filter((e) => {
//       const matchesCategory =
//         selectedCategory === "All" || e.category === selectedCategory;
//       const matchesSearch = e.title.toLowerCase().includes(searchText.toLowerCase());
//       return matchesCategory && matchesSearch;
//     });
//   };

//   return (
//     <div className="home-container">
//       {/* Search and Filter */}
//       <div className="top-bar">
//         <input
//           type="text"
//           placeholder="Search events..."
//           className="search-input"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />
//         <div className="category-bar">
//           {["All", "Comedy", "Horror", "Romantic", "Sport", "Art", "Food", "Music", "Cricket"].map(
//             (cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setSelectedCategory(cat)}
//                 className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
//               >
//                 {cat}
//               </button>
//             )
//           )}
//         </div>
//       </div>

//       {/* Event Rows */}
//       {sectionKeys.map((section, idx) => {
//         const events = allSections[section];
//         const rowRef = rowRefs.current[idx];

//         return (
//           <div key={section}>
//             <div className="home-header">
//               <h2>{section}</h2>
//               <Link to="/events" className="see-all">See all ›</Link>
//             </div>

//             <div className="scroll-wrapper">
//               <button className="scroll-btn left" onClick={() => scrollLeft(rowRef)}>‹</button>
//               <div className="event-row" ref={rowRef}>
//                 {filterEvents(events).map((event, i) => (
//                   <div className="event-card" key={i}>
//                     <img src={event.image} alt={event.title} />
//                     <h4>{event.title}</h4>
//                     <p>{event.category}</p>
//                   </div>
//                 ))}
//               </div>
//               <button className="scroll-btn right" onClick={() => scrollRight(rowRef)}>›</button>
//             </div>
//           </div>
//         );
//       })}

//       <footer className="footer">
//         <p>© {new Date().getFullYear()} EventEase. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [bookedIds, setBookedIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "guest";

  // Fetch events + bookings
  useEffect(() => {
    axios.get("https://eventserver-28rf.onrender.com/api/events")
      .then((res) => {
        const all = res.data.events || res.data;
        setEvents(all);
      });

    axios.get(`https://eventserver-28rf.onrender.com/api/booked-events/${userName}`)
      .then(res => {
        setBookedIds(res.data.bookedEventIds || []);
      });
  }, [userName]);

  const handleBookNow = (eventId) => {
    axios.post("https://eventserver-28rf.onrender.com/api/bookings", {
      userName,
      eventId,
      quantity: 1
    })
    .then(() => {
      setBookedIds(prev => [...prev, eventId]); // update UI
    })
    .catch(err => {
      alert("Booking failed or already booked.");
      console.error(err);
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
              <button className="book-btn" onClick={() => handleBookNow(event._id)}>
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
