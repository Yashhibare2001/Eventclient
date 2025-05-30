import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Load user data from localStorage
    const storedName = localStorage.getItem('userName') || 'User';
    const storedRole = localStorage.getItem('userRole') || 'User';
    setUserName(storedName);
    setUserRole(storedRole);
  }, []);

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
            <p>12 Events Booked</p>
          </div>
          <div className="card">
            <h3>📅 Upcoming Event</h3>
            <p>Annual Meetup – June 15</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
