// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = ({ logout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">AI Financial Planner</Link>
      </div>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <button className="navbar-button" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
