import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [bookedTickets, setBookedTickets] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    // Load user data from localStorage
    const storedName = localStorage.getItem('userName') || 'User';
    const storedRole = localStorage.getItem('userRole') || 'User';
    setUserName(storedName);
    setUserRole(storedRole);

    // Simulated fetch - replace with actual API call
    const allBookings = JSON.parse(localStorage.getItem('allBookings')) || [];

    const userBookings = allBookings.filter(b => b.user === storedName);
    const active = userBookings.filter(b => !b.cancelled);
    const history = userBookings;

    setBookedTickets(active);
    setBookingHistory(history);
  }, []);

  const handleCancel = (id) => {
    const updatedHistory = bookingHistory.map(b => {
      if (b.id === id) {
        return { ...b, cancelled: true };
      }
      return b;
    });

    localStorage.setItem('allBookings', JSON.stringify(updatedHistory));
    setBookingHistory(updatedHistory);
    setBookedTickets(updatedHistory.filter(b => !b.cancelled));
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <h1 className="logo">🍴 EventEase</h1>
        <nav>
          <ul>
            <li><Link to="/dashboard">🏠 Dashboard</Link></li>

            {userRole === 'User' && (
              <>
                <li><Link to="/events">🎟️ Events</Link></li>
                <li><Link to="/booking">📅 My Bookings</Link></li>
                <li><Link to="/history">📋 Booking History</Link></li>
              </>
            )}

            {userRole === 'Admin' && (
              <>
                <li><Link to="/admin/orders">📦 Manage Orders</Link></li>
                <li><Link to="/admin/summary">📊 Summary</Link></li>
                <li><Link to="/admin/reports">📝 Reports</Link></li>
              </>
            )}

            <li><Link to="/profile">👤 Profile</Link></li>
            <li><Link to="/logout">🚪 Logout</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h2>Welcome, {userName}</h2>
          <p className="role-badge">Role: {userRole}</p>
        </header>

        <section className="dashboard-cards">
          <div className="card">
            <h3>🧾 Total Bookings</h3>
            <p>{bookingHistory.length} Events Booked</p>
          </div>
          <div className="card">
            <h3>📅 Upcoming Event</h3>
            <p>{bookedTickets[0]?.event || 'None'}</p>
          </div>
        </section>

        {/* Booked Tickets */}
        <section className="booked-tickets">
          <h3>🎫 Booked Tickets</h3>
          {bookedTickets.length === 0 ? (
            <p>No active bookings.</p>
          ) : (
            bookedTickets.map(ticket => (
              <div className="ticket-card" key={ticket.id}>
                <span>{ticket.event} — {ticket.date}</span>
                <button className="cancel-btn" onClick={() => handleCancel(ticket.id)}>Cancel</button>
              </div>
            ))
          )}
        </section>

        {/* Booking History */}
        <section className="booking-history">
          <h3>📋 Booking History</h3>
          {bookingHistory.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            bookingHistory.map(ticket => (
              <div className="ticket-card" key={ticket.id}>
                <span>
                  {ticket.event} — {ticket.date}
                  {ticket.cancelled && <span style={{ color: 'red', marginLeft: '10px' }}>(Cancelled)</span>}
                </span>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
