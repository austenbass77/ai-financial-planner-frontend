import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles//NavBar.css';

const NavBar = (props) => {
  const { logout } = props;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    logout();
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
