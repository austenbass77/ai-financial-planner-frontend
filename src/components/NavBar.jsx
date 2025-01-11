import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ logout }) => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/welcome" style={styles.link}>
            Welcome
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/my-info" style={styles.link}>
            My Info
          </Link>
        </li>
        <li style={styles.navItem}>
          <button onClick={logout} style={styles.logoutButton}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    background: "#333",
    color: "#fff",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  navList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
  },
  navItem: {
    margin: "0 10px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  logoutButton: {
    background: "transparent",
    border: "1px solid #fff",
    color: "#fff",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default NavBar;
