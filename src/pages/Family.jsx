import React, { useState, useEffect } from 'react';
import '../styles/Family.css';

const Family = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    relationship: '',
    preferredName: '',
    birthDate: '',
    email: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchFamilyMembers();
  }, []);

  const fetchFamilyMembers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/family-members', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setFamilyMembers(data);
    } catch (error) {
      console.error('Error fetching family members:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (isEditing) {
        await fetch(`http://localhost:5000/api/family-members/${editId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
        setIsEditing(false);
        setEditId(null);
      } else {
        await fetch('http://localhost:5000/api/family-members', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      }
      setFormData({
        firstName: '',
        lastName: '',
        relationship: '',
        preferredName: '',
        birthDate: '',
        email: '',
      });
      fetchFamilyMembers();
    } catch (error) {
      console.error('Error saving family member:', error);
    }
  };

  const handleEdit = (member) => {
    setIsEditing(true);
    setEditId(member.id);
    setFormData({
      firstName: member.first_name,
      lastName: member.last_name,
      relationship: member.relationship,
      preferredName: member.preferred_name,
      birthDate: member.birth_date,
      email: member.email,
    });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:5000/api/family-members/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchFamilyMembers();
    } catch (error) {
      console.error('Error deleting family member:', error);
    }
  };

  return (
    <div className="family-container">
      <h1>Family Information</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          required
        />
        <input
          type="text"
          name="relationship"
          value={formData.relationship}
          onChange={handleInputChange}
          placeholder="Relationship"
        />
        <input
          type="text"
          name="preferredName"
          value={formData.preferredName}
          onChange={handleInputChange}
          placeholder="Preferred Name"
        />
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleInputChange}
          placeholder="Birth Date"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <button type="submit">{isEditing ? 'Update' : 'Add'} Family Member</button>
      </form>

      <div className="family-list">
        {familyMembers.map((member) => (
          <div key={member.id} className="family-item">
            <p>
              <strong>{member.first_name} {member.last_name}</strong> ({member.relationship})
            </p>
            <button onClick={() => handleEdit(member)}>Edit</button>
            <button onClick={() => handleDelete(member.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Family;
