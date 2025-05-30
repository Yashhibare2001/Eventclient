import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img 
          src="/assets/logo.png" 
          alt="EventEase Logo" 
          className="navbar-logo" 
        />
        <h1 className="navbar-title">EventEase</h1>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li>
          <Link to="/dashboard" className="dashboard-icon" title="Dashboard">
            {/* <img src="/assets/user-icon.png" alt="Dashboard" /> */}
            <img src="https://img.icons8.com/ios-filled/50/user.png" alt="Dashboard" />

          </Link>
        </li>
      </ul>
    </nav>
  );
}
