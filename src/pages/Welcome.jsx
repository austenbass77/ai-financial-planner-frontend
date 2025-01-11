import React from "react";
import { Link } from "react-router-dom";

const Welcome = ({ logout }) => {
  return (
    <div>
      <h1>Welcome to the Financial Planner App!</h1>
      <p>
        <Link to="/my-info">Go to My Info</Link>
      </p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Welcome;
