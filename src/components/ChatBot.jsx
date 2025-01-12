import React, { useState } from 'react';
import '../styles/ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you with your profile today?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message to the chat
    setMessages([...messages, { text: input, sender: 'user' }]);

    try {
      const token = localStorage.getItem('authToken'); // Get the token from localStorage

      const response = await fetch('http://localhost:5000/api/users/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add the Authorization header
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      // Add bot response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.response, sender: 'bot' },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Sorry, something went wrong. Please try again.', sender: 'bot' },
      ]);
    }

    setInput('');
  };

  return (
    <div className={`chat-bot-container ${isChatOpen ? 'open' : ''}`}>
      <button className="chat-toggle-button" onClick={toggleChat}>
        {isChatOpen ? 'Close Chat' : 'Chat with us'}
      </button>
      {isChatOpen && (
        <div className="chat-bot">
          <div className="chat-box">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
