import React from 'react';
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom
import './Navbar.css'; // Importing the CSS file
const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    
    // Optionally, redirect to the login page after logout
    window.location.href = '/'; // Or use React Router's `history.push('/auth')` if you're using React Router
  };
  

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <h2>EngiGrow</h2>
      </div>
      <div className="nav-links">
        <Link to="/Main" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/news" className="nav-link">News</Link>
        <button onClick={handleLogout} className='logout'>Logout</button>

      </div>
    </div>
  );
}

export default Navbar;

