import React, { useEffect, useState } from "react";
import axios from "axios";

const FamilyMembers = () => {
  const [familyMembers, setFamilyMembers] = useState([]);

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        const { data } = await axios.get("/api/family-members");
        setFamilyMembers(data);
      } catch (error) {
        console.error("Failed to fetch family members:", error);
      }
    };
    fetchFamilyMembers();
  }, []);

  return (
    <div>
      <h2>Family Members</h2>
      <ul>
        {familyMembers.map((member) => (
          <li key={member.id}>
            {member.relationship}: {member.first_name} {member.last_name} ({member.birth_date})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FamilyMembers;
