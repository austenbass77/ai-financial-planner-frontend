import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({ email: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setMessage('Unauthorized. Please log in.');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          setMessage('Failed to fetch profile. Please log in again.');
        }
      } catch (error) {
        setMessage('Server error. Please try again later.');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      {message && <p className="error-message">{message}</p>}
      <div className="profile-info">
        <p>Email: {profile.email}</p>
      </div>
    </div>
  );
};

export default Profile;
