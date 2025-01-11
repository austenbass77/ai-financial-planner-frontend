import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Home</h1>
      <p>Welcome to the AI Financial Planner!</p>
      <nav>
        <Link to="/my-information">Go to My Information</Link>
      </nav>
    </div>
  );
}

export default Home;