// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Auth/Login"; 
// import EventsPage from "./Component/Pages/EventPages";
import Register from "./Component/Auth/Register";
import Home from "./Component/Pages/Home";
import Navbar from "./Component/Pages/Navbar";
import Dashboard from './Component/Pages/Dashboard'; // adjust path
import BookingEvents from "./Component/Pages/BookingEvents";
// import BookingHistory from "./pages/BookingHistory";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookings" element={<BookingEvents />} />
        {/* Assuming EventsPage is used for both events and history */}


<Route path="/dashboard" element={<Dashboard />} />


      </Routes>
    </Router>
  );
}

export default App;
