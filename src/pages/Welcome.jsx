// src/pages/Welcome.jsx
import React from 'react';
import NavBar from '../components/NavBar';
import '../styles/Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-page">
      <NavBar />
      <div className="welcome-container">
        <h1>Welcome to the AI Financial Planner!</h1>
        <p>Your personalized financial planning assistant.</p>
      </div>
    </div>
  );
};

export default Welcome;
