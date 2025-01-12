// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import '../styles/Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch the user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('authToken');

    const response = await fetch('http://localhost:5000/api/users/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profile),
    });

    if (response.ok) {
      setMessage('Profile updated successfully!');
      setEditing(false);
    } else {
      setMessage('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setMessage('');
  };

  return (
    <div className="profile-page">
      <NavBar />
      <div className="profile-container">
        <h1>Welcome, {profile.firstName}!</h1>
        {message && <p className="message">{message}</p>}
        <form>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
          <div className="button-group">
            {!editing ? (
              <button type="button" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            ) : (
              <>
                <button type="button" onClick={handleSave}>
                  Save
                </button>
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
