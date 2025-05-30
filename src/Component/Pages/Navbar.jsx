import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assests/logo.jpg'; // Adjust the path as necessary 

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img 
          src={logo} 
          alt="EventEase Logo" 
          className="navbar-logo" 
        />
        <h1 className="navbar-title">BookMyEvent</h1>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/EventBooked">EventsTckets</Link></li>
        <li><Link to="/HistoryPage">History</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li>
          <Link to="/dashboard" className="dashboard-icon" title="Dashboard">
            <img src="https://img.icons8.com/ios-filled/50/user.png" alt="Dashboard" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
