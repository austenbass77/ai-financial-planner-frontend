import React from 'react';
import '../styles/Welcome.css';
import ChatBot from '../components/ChatBot';

const Welcome = () => {
  return (
    <div className="welcome-page">
      <h1>Welcome to the AI Financial Planner!</h1>
      <p>Your personalized financial planning assistant.</p>
      <ChatBot />
    </div>
  );
};

export default Welcome;
