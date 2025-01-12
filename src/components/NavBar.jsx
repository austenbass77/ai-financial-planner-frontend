// src/components/NavBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = ({ logout }) => {
  console.log('Received logout prop:', logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the auth token from localStorage
    localStorage.removeItem('authToken');

    // Call the logout function to update state
    logout();

    // Redirect to the login page
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/welcome">AI Financial Planner</Link>
      </div>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <button className="navbar-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
